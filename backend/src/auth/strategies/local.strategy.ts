import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-local'
import { User } from '@prisma/client'
import { ExceptionInvalidCredentials } from 'src/common/exceptions/unauthorized-strategy.exception'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ usernameField: 'email' })
  }
  @Inject(AuthService)
  private readonly authService: AuthService

  async validate(email: string, password: string, callback: CallableFunction) {
    let user: User

    if (!email)
      throw new ExceptionInvalidCredentials('Local OAuth20 failed: no email')
    if (!password)
      throw new ExceptionInvalidCredentials('Local OAuth20 failed: no password')

    try {
      user = await this.authService.validateLocalUser(email, password)
    } catch (e) {
      throw new e()
    }
    if (!user) {
      throw new ExceptionInvalidCredentials(
        'Local OAuth20 failed: user not found'
      )
    }
    return callback(null, user)
  }
}
