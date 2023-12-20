import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { AuthService } from '../auth.service'
import {
  ExceptionCustom,
  ExceptionInvalidCredentials
} from 'src/common/exceptions/unauthorized-strategy.exception'
import { checkLanguage } from '../utils/check.utils'
import { ELanguage, User } from '@prisma/client'
import { ELogType, LoggingService } from 'src/common/logging/file.logging'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: process.env['GOOGLE_CALLBACK_URL'],
      scope: ['profile', 'email']
    })
  }

  @Inject(AuthService)
  private readonly authService: AuthService

  private readonly loggingService = new LoggingService(ELogType.login)
  async validate(
    token: string,
    refreshToken: string,
    profile: Profile,
    callback: CallableFunction
  ) {
    if (!profile)
      throw new ExceptionInvalidCredentials('Google OAuth20 failed: no profile')
    const avatarUrl = profile.photos ? profile.photos[0].value : undefined
    const email = profile.emails ? profile.emails[0].value : undefined
    const username = profile.displayName
    const languageToCheck = profile._json.locale
    let language: ELanguage | undefined = undefined
    let user: User

    if (languageToCheck)
      language = checkLanguage(languageToCheck, {
        English: 'en',
        French: 'fr',
        Spanish: 'es'
      })

    if (!email)
      throw new ExceptionInvalidCredentials('Google OAuth20 failed: no email')
    if (!username)
      throw new ExceptionInvalidCredentials(
        'Google OAuth20 failed: no username'
      )

    try {
      user = await this.authService.validateGoogleUser({
        username,
        email,
        avatarUrl,
        language
      })
    } catch (e) {
      throw new ExceptionCustom(
        'Google auth Error : come back at computer address'
      )
    }
    if (!user) {
      throw new ExceptionInvalidCredentials(
        'Google OAuth20 failed: user not found'
      )
    }

    this.loggingService.log('-- Google Auth --')
    return callback(null, user)
  }
}
