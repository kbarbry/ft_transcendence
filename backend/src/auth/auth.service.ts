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

@Injectable()
export class AuthService {
  @Inject(UserService)
  private readonly userService: UserService

  async checkUsername(username: string): Promise<string> {
    let checkedUsername = username.trim().slice(30)
    if (await this.userService.isUsernameUsed(username)) {
      const slicedUsername = username.slice(0, 10)
      const nanoIdUsername = randomBytes(15).toString('hex').slice(0, 15)
      checkedUsername = slicedUsername.trim() + '-' + nanoIdUsername
    }
    console.log(checkedUsername)
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
}
