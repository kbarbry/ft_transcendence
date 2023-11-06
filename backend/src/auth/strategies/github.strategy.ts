import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github2'
import { AuthService } from '../auth.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env['GITHUB_CLIENT_ID'],
      clientSecret: process.env['GITHUB_CLIENT_SECRET'],
      callbackURL: process.env['GITHUB_CALLBACK_URL'],
      scope: ['profile', 'user:email']
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
    return callback(null, await user)
  }
}
