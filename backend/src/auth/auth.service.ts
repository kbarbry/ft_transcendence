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
}
