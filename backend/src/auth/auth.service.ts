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
import { Validation2fauth } from './dto/auth-2fa-input'
import { randomBytes } from 'crypto'
import { plainToClass } from 'class-transformer'
import { ExceptionCustomClassValidator } from 'src/common/exceptions/class-validator.exception'
import * as bcrypt from 'bcrypt'
import crypto from 'crypto'
import { encode } from 'hi-base32'
import * as OTPAuth from 'otpauth'
import { Response } from 'express'

import { error } from 'console'
import { ExceptionCustom } from 'src/common/exceptions/unauthorized-strategy.exception'

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

  async checkAvatarUrl(avatarUrl?: string): Promise<string | undefined> {
    if (!avatarUrl) return
    const checkedAvatarUrl = avatarUrl.trim()

    if (checkedAvatarUrl === '') return
    try {
      if (!isURL(checkedAvatarUrl)) return
      const response = await fetch(avatarUrl)
      const contentType = response.headers.get('Content-Type')

      if (!response.ok || (contentType && !contentType.startsWith('image/')))
        return
    } catch (e) {
      return
    }
    return checkedAvatarUrl
  }

  async createUserOAuth20(data: CreateUserAOuth20Input): Promise<User> {
    const dataClass = plainToClass(CreateUserAOuth20Input, data)
    const error = await validate(dataClass)

    if (error.length) throw new ExceptionCustomClassValidator(error)

    return this.prisma.user.create({ data })
  }

  async OtpValidation(data: Validation2fauth) {
    const otp = plainToClass(Validation2fauth, data)
    const error = await validate(otp)

    if (error.length) throw new ExceptionCustomClassValidator(error)
    return otp
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
      const avatarUrl = await this.checkAvatarUrl(profile.avatarUrl)
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
      const avatarUrl = await this.checkAvatarUrl(profile.avatarUrl)
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
      const avatarUrl = await this.checkAvatarUrl(profile.avatarUrl)
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

      const otp = await this.OtpValidation({
        id: user_id
      })
      this.OtpValidation(otp)

      const user = await this.userService.findOne(user_id)

      if (!user) {
        throw new ExceptionCustom('invalid user')
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
          notValidateOtpUrl: otpauth_url,
          notValidateOtp: base32_secret
        }
      })

      res.status(200).json({
        base32: base32_secret,
        otpauth_url
      })
    } catch (error) {
      throw new ExceptionCustom('cant generate QrCode 2fa')
    }
  }

  async VerifyOTP(id: string, secret: string, res: Response) {
    try {
      const user_id = id
      const token = secret

      const otp = await this.OtpValidation({
        otp: token,
        id: user_id
      })
      this.OtpValidation(otp)

      const user = await this.userService.findOne(user_id)
      if (!user) {
        throw new ExceptionCustom('invalid id')
      }

      const userMail = user.mail

      const totp = new OTPAuth.TOTP({
        issuer: userMail,
        label: 'Transcendance',
        algorithm: 'SHA1',
        digits: 6,
        secret: user.ValidateOtp!
      })
      const delta = totp.validate({ token })

      if (delta === null) {
        throw new ExceptionCustom('invalid token')
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
      throw new ExceptionCustom('Cant verify 2fa')
    }
  }

  async ValidateOTP(id: string, secret: string, res: Response) {
    try {
      const user_id = id
      const token = secret

      const otp = await this.OtpValidation({
        otp: token,
        id: user_id
      })
      this.OtpValidation(otp)

      const user = await this.userService.findOne(user_id)
      if (!user) {
        throw new ExceptionCustom('invalid UserId')
      }

      const userMail = user.mail

      const totp = new OTPAuth.TOTP({
        issuer: userMail,
        label: 'Transcendance',
        algorithm: 'SHA1',
        digits: 6,
        secret: user.notValidateOtp!
      })
      const delta = totp.validate({ token })

      if (delta === null) {
        throw new ExceptionCustom('invalid token')
      }

      await this.prisma.user.update({
        where: {
          id: user_id
        },
        data: {
          doubleA: true,
          validation2fa: true,
          ValidateOtp: user.notValidateOtp,
          ValidateOtpUrl: user.notValidateOtpUrl
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
      throw new ExceptionCustom('Cant validate 2fa')
    }
  }

  async unset2fa(id: string, secret: string, res: Response) {
    try {
      const user_id = id
      const token = secret

      const otp = await this.OtpValidation({
        otp: token,
        id: user_id
      })
      this.OtpValidation(otp)

      const user = await this.userService.findOne(user_id)
      if (!user) {
        throw new ExceptionCustom('invalid UserId')
      }

      const userMail = user.mail

      const totp = new OTPAuth.TOTP({
        issuer: userMail,
        label: 'Transcendance',
        algorithm: 'SHA1',
        digits: 6,
        secret: user.ValidateOtp!
      })
      const delta = totp.validate({ token })

      if (delta === null) {
        throw new ExceptionCustom('invalid Token')
      }

      await this.prisma.user.update({
        where: {
          id: user_id
        },
        data: {
          doubleA: false,
          validation2fa: true,
          notValidateOtp: null,
          notValidateOtpUrl: null,
          ValidateOtp: null,
          ValidateOtpUrl: null
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
      throw new ExceptionCustom('Error disable 2fa')
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
        validation2fa: true
      }
    })
  }
}