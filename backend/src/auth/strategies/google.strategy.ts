import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { AuthService } from '../auth.service'
import { ExceptionInvalidCredentials } from 'src/common/exceptions/unauthorized-strategy.exception'
import { checkLanguage } from '../utils/check.utils'
import { ELanguage, User } from '@prisma/client'

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
    const langToCheck = profile._json.locale
    let language: ELanguage | undefined = undefined
    let user: User
    try {
      console.log('Reception profile')
      console.log(langToCheck)
      if (langToCheck)
        language = checkLanguage(langToCheck, {
          English: 'en',
          French: 'fr',
          Spanish: 'es'
        })
      if (!email)
        throw new ExceptionInvalidCredentials('Google OAuth20 failed: no email')
      user = await this.authService.validateGoogleUser({
        username,
        email,
        avatarUrl,
        language
      })
      console.log('User found')
      console.log(user)
    } catch (e) {
      console.log(e)
      throw new e()
    }
    if (!user) {
      throw new ExceptionInvalidCredentials(
        'Google OAuth20 failed: user not found'
      )
    }
    return callback(null, user)
  }
}
