import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github2'
import { AuthService } from '../auth.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: '0c0315b4861ba384ccd7',
      clientSecret: 'b73826934e72d2b84b479fe6d7cbbef7d754a42e',
      callbackURL: 'http://localhost:3000/api/auth/github/redirect',
      scope: ['profile', 'user:email']
    })
  }

  @Inject(AuthService)
  private readonly authService: AuthService

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    callback: CallableFunction
  ) {
    console.log('Calling GithubStrategy validate.')
    console.log(profile)

    const avatarUrl = profile.photos ? profile.photos[0].value : undefined
    const email = profile.emails ? profile.emails[0].value : undefined
    const username = profile.displayName
    if (!email) throw new UnauthorizedException()
    const user = this.authService.validateGitHubUser({
      email,
      username,
      avatarUrl
    })
    return callback(null, user)
  }
}
