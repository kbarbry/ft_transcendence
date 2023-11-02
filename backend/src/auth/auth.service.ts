import { Inject, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { isURL } from 'class-validator'
import {
  EStrategy,
  checkStrategy,
  checkUsername,
  checkValidStrategies
} from './utils/check.utils'
import { ExceptionUnauthorizedStrategy } from 'src/common/exceptions/unauthorized-strategy.exception'

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

  async validateGoogleUser(profile: GoogleUserParams) {
    let user = await this.userService.findOnebyMail(profile.email)
    console.log(user)
    if (!user) {
      const username = await checkUsername(profile.username)
      let avatarUrl = profile.avatarUrl
      if (avatarUrl) avatarUrl = isURL(avatarUrl) ? avatarUrl : undefined
      user = await this.userService.create({
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
}
