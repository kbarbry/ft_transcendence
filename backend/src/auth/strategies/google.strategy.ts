import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { AuthService } from '../auth.service'
import { ELanguage } from '@prisma/client'

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
    const avatarUrl = profile.photos ? profile.photos[0].value : undefined
    const email = profile.emails ? profile.emails[0].value : undefined
    const username = profile.displayName
    console.log('Reception profile')
    console.log(profile)
    // let language: string | undefined = profile._json.locale
    //   ? profile._json.locale
    //   : undefined
    // switch (language) {
    //   case 'fr': {
    //     language = ELanguage.English
    //     break
    //   }
    //   case 'en': {
    //     language = ELanguage.French
    //     break
    //   }
    //   default: {
    //     language = ELanguage.English
    //     break
    //   }
    // }
    if (!email) throw new UnauthorizedException()
    const user = this.authService.validateGoogleUser({
      username,
      email,
      avatarUrl
      // language
    })
    console.log('User found')
    console.log(user)
    return callback(null, await user)
  }
}
