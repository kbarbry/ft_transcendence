import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ usernameField: 'email' })
  }
  @Inject(AuthService)
  private readonly authService: AuthService

  async validate(email: string, password: string, callback: CallableFunction) {
    const user = await this.authService.validateLocalUser(email, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return callback(null, user)
  }
}
