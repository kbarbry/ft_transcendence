import { Injectable, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import passport42 from 'passport-42'

@Injectable()
export class School42Strategy extends PassportStrategy(
  passport42.Strategy,
  '42'
) {
  constructor() {
    super({
      clientID: process.env['42_CLIENT_ID'],
      clientSecret: process.env['42_CLIENT_SECRET'],
      callbackURL: process.env['42_CALLBACK_URL']
    })
  }

  @Inject(AuthService)
  private readonly authService: AuthService

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    callback: CallableFunction
  ) {
    const username = profile.username
    const email = profile.emails[0].value
    const avatarUrl = profile._json.image.link
    const user = this.authService.validateSchool42({
      username,
      email,
      avatarUrl
    })
    return callback(null, user)
  }
}
