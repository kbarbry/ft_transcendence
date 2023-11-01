import { Inject, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { randomBytes } from 'crypto'
import { isURL } from 'class-validator'

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
  language?: string
}

@Injectable()
export class AuthService {
  @Inject(UserService)
  private readonly userService: UserService

  async checkUsername(username: string): Promise<string> {
    let checkedUsername = username.trim().slice(0, 29)
    console.log('Before change ', checkedUsername)
    if (
      username.length <= 0 ||
      (await this.userService.isUsernameUsed(username))
    ) {
      const slicedUsername = username.slice(0, 10)
      const nanoIdUsername = randomBytes(15).toString('hex').slice(0, 15)
      checkedUsername = slicedUsername.trim() + '-' + nanoIdUsername
    }
    console.log('AuthService 29 : checkUsername(): ' + checkedUsername)
    return checkedUsername
  }

  async validateGoogleUser(profile: GoogleUserParams) {
    let userResult = await this.userService.findOnebyMail(profile.email)
    console.log(userResult)
    if (!userResult) {
      const username = await this.checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      userResult = await this.userService.create({
        mail: profile.email,
        username: username,
        avatarUrl: avatarUrl
      })
    }
    return userResult
  }

  async validateGitHubUser(profile: GithubUserParams) {
    let userResult = await this.userService.findOnebyMail(profile.email)
    if (!userResult) {
      const username = await this.checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      userResult = await this.userService.create({
        mail: profile.email,
        username: username,
        avatarUrl: avatarUrl
      })
    }
    return userResult
  }

  async validateFortyTwo(profile: any) {
    let userResult = await this.userService.findOnebyMail(profile.email)
    if (!userResult) {
      const username = await this.checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      userResult = await this.userService.create({
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
