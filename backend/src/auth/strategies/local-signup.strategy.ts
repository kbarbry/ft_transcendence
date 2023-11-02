import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-local'
import { CreateUserAuthInput } from '../dto/create-user-auth.input'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local-signup') {
  constructor() {
    super({ usernameField: 'email' })
  }

  @Inject(AuthService)
  private readonly authService: AuthService

  async validate(userInput: CreateUserAuthInput, callback: CallableFunction) {
    const user = await this.authService.createUser(userInput)
    return callback(null, user)
  }
}
