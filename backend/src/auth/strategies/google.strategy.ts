import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { AuthService } from '../auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['profile', 'email']
    })
  }

  @Inject(AuthService)
  private readonly authService: AuthService

  async validate(profile: Profile, callback: CallableFunction) {
    const avatarUrl = profile.photos ? profile.photos[0].value : undefined
    const email = profile.emails ? profile.emails[0].value : undefined
    const username = profile.displayName
    if (!email) throw new UnauthorizedException()
    const user = this.authService.validateGoogleUser({
      username,
      email,
      avatarUrl
    })
    return callback(null, user)
  }
}
