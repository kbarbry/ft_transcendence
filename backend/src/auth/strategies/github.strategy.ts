import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github2'
import { AuthService } from '../auth.service'
import { ExceptionInvalidCredentials } from 'src/common/exceptions/unauthorized-strategy.exception'
import { User } from '@prisma/client'
import { ELogType, LoggingService } from 'src/common/logging/file.logging'

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

  private readonly loggingService = new LoggingService(ELogType.login)

  async validate(
    token: string,
    refreshToken: string,
    profile: Profile,
    callback: CallableFunction
  ) {
    if (!profile)
      throw new ExceptionInvalidCredentials('Github OAuth20 failed: no profile')
    const avatarUrl = profile.photos ? profile.photos[0].value : undefined
    const email = profile.emails ? profile.emails[0].value : undefined
    const username = profile.displayName
    let user: User

    if (!email)
      throw new ExceptionInvalidCredentials('Github OAuth20 failed: no email')
    if (!username)
      throw new ExceptionInvalidCredentials(
        'Github OAuth20 failed: no username'
      )
    try {
      user = await this.authService.validateGitHubUser({
        email,
        username,
        avatarUrl
      })
    } catch (e) {
      throw e
    }
    if (!user) {
      throw new ExceptionInvalidCredentials(
        'Github OAuth20 failed: user not found'
      )
    }

    this.loggingService.log('-- Github Auth --')
    return callback(null, user)
  }
}
