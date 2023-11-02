import { Inject, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { isURL, validate } from 'class-validator'
import {
  EStrategy,
  checkStrategy,
  checkUsername,
  checkValidStrategies
} from './utils/check.utils'
import { ExceptionUnauthorizedStrategy } from 'src/common/exceptions/unauthorized-strategy.exception'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserAuthInput } from './dto/create-user-auth.input'

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

  async createUser(data: CreateUserAuthInput): Promise<User> {
    await this.validateUserData(data)
    return this.prisma.user.create({ data })
  }

  async validateUserData(dto: CreateUserAuthInput): Promise<boolean> {
    try {
      await validate(dto, { skipMissingProperties: true })
      return true
    } catch (errors) {
      console.error(errors)
      return false
    }
  }

  async validateGoogleUser(profile: GoogleUserParams) {
    let user = await this.userService.findOnebyMail(profile.email)
    console.log(user)
    if (!user) {
      const username = await checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      user = await this.createUser({
        mail: profile.email,
        username: username,
        avatarUrl: avatarUrl
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
    let userResult = await this.userService.findOnebyMail(profile.email)
    if (!userResult) {
      const username = await checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      userResult = await this.createUser({
        mail: profile.email,
        username: username,
        avatarUrl: avatarUrl
      })
    }
    return userResult
  }

  async validateSchool42(profile: School42UserParams) {
    let userResult = await this.userService.findOnebyMail(profile.email)
    if (!userResult) {
      const username = await checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      userResult = await this.createUser({
        mail: profile.email,
        username: username,
        avatarUrl: avatarUrl
      })
    }
    return userResult
  }

  async validateLocalUser(email: string, password: string) {
    const userResult = await this.userService.findOnebyMail(email)
    if (!userResult || !(userResult.password === password)) {
      return null
    }
    return userResult
  }
}
