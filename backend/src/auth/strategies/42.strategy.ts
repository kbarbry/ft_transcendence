import { Injectable, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import passport42 from 'passport-42'
import { ExceptionInvalidCredentials } from 'src/common/exceptions/unauthorized-strategy.exception'

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
    token: string,
    refreshToken: string,
    profile: any,
    callback: CallableFunction
  ) {
    if (!profile)
      throw new ExceptionInvalidCredentials('School42 OAuth20 failed')
    const username = profile.username
    const email = profile.emails[0].value
    const avatarUrl = profile._json.image.link
    const user = this.authService.validateSchool42({
      username,
      email,
      avatarUrl
    })
    return callback(null, await user)
  }
}
