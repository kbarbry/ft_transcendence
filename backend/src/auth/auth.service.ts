import { Inject, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { isURL, validate } from 'class-validator'
import {
  EStrategy,
  checkStrategy,
  checkValidStrategies
} from './utils/check.utils'
import {
  ExceptionInvalidCredentials,
  ExceptionUnauthorizedStrategy
} from 'src/common/exceptions/unauthorized-strategy.exception'
import { ELanguage, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  CreateUserAOuth20Input,
  CreateUserAuthLocalInput
} from './dto/create-user-auth.input'
import { randomBytes } from 'crypto'
import { plainToClass } from 'class-transformer'
import { ExceptionCustomClassValidator } from 'src/common/exceptions/class-validator.exception'
import * as bcrypt from 'bcrypt'
import crypto from 'crypto'
import { encode } from 'hi-base32'
import * as OTPAuth from 'otpauth'
import { Request, Response, NextFunction } from 'express'
import { Context } from '@nestjs/graphql'
import { error } from 'console'

type GoogleUserParams = {
  email: string
  username: string
  avatarUrl?: string
  language?: ELanguage
}

type GithubUserParams = {
  email: string
  username: string
  avatarUrl?: string
}

type School42UserParams = {
  email: string
  username: string
  avatarUrl?: string
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  @Inject(UserService)
  private readonly userService: UserService

  async checkUsername(username: string): Promise<string> {
    let checkedUsername = username.trim().slice(0, 29)
    await this.userService.isUsernameUsed(username)
    if (
      username.length <= 0 ||
      (await this.userService.isUsernameUsed(username))
    ) {
      const slicedUsername = username.slice(0, 10)
      const nanoIdUsername = randomBytes(15).toString('hex').slice(0, 15)
      checkedUsername = slicedUsername.trim() + '-' + nanoIdUsername
    }
    return checkedUsername
  }

  async createUserOAuth20(data: CreateUserAOuth20Input): Promise<User> {
    const dataClass = plainToClass(CreateUserAOuth20Input, data)
    const error = await validate(dataClass)

    if (error.length) throw new ExceptionCustomClassValidator(error)

    return this.prisma.user.create({ data })
  }

  async createUserLocal(data: CreateUserAuthLocalInput): Promise<User> {
    const dataClass = plainToClass(CreateUserAuthLocalInput, data)
    const error = await validate(dataClass)

    if (error.length) throw new ExceptionCustomClassValidator(error)

    data.password = bcrypt.hashSync(data.password, 10)
    return this.prisma.user.create({ data })
  }

  async validateGoogleUser(profile: GoogleUserParams): Promise<User> {
    let user = await this.userService.findOnebyMail(profile.email)
    if (!user) {
      const username = await this.checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      user = await this.createUserOAuth20({
        mail: profile.email,
        username: username,
        avatarUrl: avatarUrl,
        languages: profile.language,
        googleAuth: true
      })
    } else if (!checkStrategy(EStrategy.google, user)) {
      throw new ExceptionUnauthorizedStrategy(
        EStrategy.google,
        checkValidStrategies(user)
      )
    }
    return user
  }

  async validateGitHubUser(profile: GithubUserParams): Promise<User> {
    let user = await this.userService.findOnebyMail(profile.email)
    if (!user) {
      const username = await this.checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      user = await this.createUserOAuth20({
        mail: profile.email,
        username: username,
        avatarUrl: avatarUrl,
        githubAuth: true
      })
    } else if (!checkStrategy(EStrategy.github, user)) {
      throw new ExceptionUnauthorizedStrategy(
        EStrategy.github,
        checkValidStrategies(user)
      )
    }
    return user
  }

  async validateSchool42(profile: School42UserParams): Promise<User> {
    let user = await this.userService.findOnebyMail(profile.email)
    if (!user) {
      const username = await this.checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      user = await this.createUserOAuth20({
        mail: profile.email,
        username: username,
        avatarUrl: avatarUrl,
        school42Auth: true
      })
    } else if (!checkStrategy(EStrategy.school42, user)) {
      throw new ExceptionUnauthorizedStrategy(
        EStrategy.school42,
        checkValidStrategies(user)
      )
    }
    return user
  }

  async isUser2fa(id: string): Promise<boolean> {
    const user = await this.userService.findOne(id)
    if (!user) throw error()
    const user2fa = user.doubleA
    return user2fa
  }

  async validateLocalUser(mail: string, password: string): Promise<User> {
    const user = await this.userService.findOnebyMail(mail)
    if (!user || !(await bcrypt.compare(password, user.password as string))) {
      throw new ExceptionInvalidCredentials('Mail or password is invalid')
    } else if (!checkStrategy(EStrategy.local, user)) {
      throw new ExceptionUnauthorizedStrategy(
        EStrategy.local,
        checkValidStrategies(user)
      )
    }
    return user
  }

  async twoFactorAuth(): Promise<string> {
    return 'test'
  }

  async generateRandomBase32(): Promise<string> {
    const buffer = crypto.randomBytes(15)
    const base32 = encode(buffer).replace(/=/g, '').substring(0, 24)
    return base32
  }

  async GenerateOTP(id: string, res: Response): Promise<any> {
    try {
      const user_id = id
      const user = await this.userService.findOne(user_id)

      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'No user with that email exists'
        })
      }

      const base32_secret = await this.generateRandomBase32()
      const userMail = user.mail

      const totp = new OTPAuth.TOTP({
        issuer: userMail,
        label: 'Transcendance',
        algorithm: 'SHA1',
        digits: 6,
        secret: base32_secret
      })

      const otpauth_url = totp.toString()

      await this.prisma.user.update({
        where: {
          id: user_id
        },
        data: {
          otpUrl: otpauth_url,
          otp: base32_secret
        }
      })

      res.status(200).json({
        base32: base32_secret,
        otpauth_url
      })
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  }

  async VerifyOTP(id: string, secret: string, res: Response) {
    try {
      const user_id = id
      const token = secret
      const user = await this.userService.findOne(user_id)
      const message = "Token is invalid or user doesn't exist"
      if (!user) {
        return res.status(401).json({
          status: 'fail',
          message
        })
      }

      const userMail = user.mail

      const totp = new OTPAuth.TOTP({
        issuer: userMail,
        label: 'Transcendance',
        algorithm: 'SHA1',
        digits: 6,
        secret: user.otp!
      })
      const delta = totp.validate({ token })

      if (delta === null) {
        return res.status(401).json({
          status: 'fail',
          message
        })
      }

      await this.prisma.user.update({
        where: {
          id: user_id
        },
        data: {
          doubleA: true,
          validation2fa: true
        }
      })

      res.status(200).json({
        otp_verified: true,
        user: {
          id: user.id,
          name: user.username,
          email: user.mail,
          otp_enabled: user.doubleA
        }
      })
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  }

  async ValidateOTP(id: string, secret: string, res: Response) {
    try {
      const user_id = id
      const token = secret
      const user = await this.userService.findOne(user_id)
      const message = "Token is invalid or user doesn't exist"
      if (!user) {
        return res.status(401).json({
          status: 'fail',
          message
        })
      }
      const userMail = user.mail

      const totp = new OTPAuth.TOTP({
        issuer: userMail,
        label: 'Transcendance',
        algorithm: 'SHA1',
        digits: 6,
        secret: user.otp!
      })

      const delta = totp.validate({ token })

      if (delta === null) {
        return res.status(401).json({
          status: 'fail',
          message
        })
      }

      res.status(200).json({
        otp_valid: true
      })
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  }
  async unset2faValidation(id: string) {
    const user_id = id
    await this.prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        validation2fa: false
      }
    })
  }

  async set2faValidation(id: string) {
    const user_id = id
    await this.prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        validation2fa: false
      }
    })
  }
}
