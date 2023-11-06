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
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  CreateUserAOuth20Input,
  CreateUserAuthInput
} from './dto/create-user-auth.input'
import { randomBytes } from 'crypto'
import { plainToClass } from 'class-transformer'
import { ExceptionCustomClassValidator } from 'src/common/exceptions/class-validator.exception'
import * as bcrypt from 'bcrypt'

type GoogleUserParams = {
  email: string
  username: string
  avatarUrl?: string
  language?: string
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

  async createUser(
    data: CreateUserAuthInput | CreateUserAOuth20Input
  ): Promise<User> {
    const dataClass = plainToClass(CreateUserAuthInput, data)
    const error = await validate(dataClass)
    if (error.length) throw new ExceptionCustomClassValidator(error)
    return this.prisma.user.create({ data })
  }

  async validateGoogleUser(profile: GoogleUserParams) {
    let user = await this.userService.findOnebyMail(profile.email)
    if (!user) {
      const username = await this.checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      user = await this.createUser({
        mail: profile.email,
        username: username,
        avatarUrl: avatarUrl,
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

  async validateGitHubUser(profile: GithubUserParams) {
    let user = await this.userService.findOnebyMail(profile.email)
    if (!user) {
      const username = await this.checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      user = await this.createUser({
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

  async validateSchool42(profile: School42UserParams) {
    let user = await this.userService.findOnebyMail(profile.email)
    if (!user) {
      const username = await this.checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      user = await this.createUser({
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

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findOnebyMail(email)
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
