import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github2'
import { AuthService } from '../auth.service'

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super() //TODO
  }

  @Inject(AuthService)
  private readonly authService: AuthService

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const id = profile.id

    const user = this.authService.validateGitHubUser() //Set the right parameter in function of the github profil infos
  }
}
