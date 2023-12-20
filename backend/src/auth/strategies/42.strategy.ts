import { Injectable, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import passport42 from 'passport-42'
import { ExceptionInvalidCredentials } from 'src/common/exceptions/unauthorized-strategy.exception'
import { User } from '@prisma/client'
import { ELogType, LoggingService } from 'src/common/logging/file.logging'

@Injectable()
export class School42Strategy extends PassportStrategy(
  passport42.Strategy,
  '42'
) {
  constructor() {
    super({
      clientID: process.env['CLIENT_ID'],
      clientSecret: process.env['CLIENT_SECRET'],
      callbackURL: process.env['CALLBACK_URL']
    })
  }

  @Inject(AuthService)
  private readonly authService: AuthService

  private readonly loggingService = new LoggingService(ELogType.login)

  async validate(
    token: string,
    refreshToken: string,
    profile: any,
    callback: CallableFunction
  ) {
    if (!profile)
      throw new ExceptionInvalidCredentials(
        'School42 OAuth20 failed: no profile'
      )
    const avatarUrl = profile._json.image.link
    const email = profile.emails[0].value
    const username = profile.username
    let user: User

    if (!email)
      throw new ExceptionInvalidCredentials('School42 OAuth20 failed: no email')
    if (!username)
      throw new ExceptionInvalidCredentials(
        'School42 OAuth20 failed: no username'
      )
    try {
      user = await this.authService.validateSchool42({
        username,
        email,
        avatarUrl
      })
    } catch (e) {
      throw e
    }
    if (!user) {
      throw new ExceptionInvalidCredentials(
        'School42 OAuth20 failed: user not found'
      )
    }

    this.loggingService.log('-- School42 Auth --')
    return callback(null, user)
  }
}
