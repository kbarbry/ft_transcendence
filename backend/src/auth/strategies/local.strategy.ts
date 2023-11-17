import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-local'
import { User } from '@prisma/client'
import { ExceptionInvalidCredentials } from 'src/common/exceptions/unauthorized-strategy.exception'
import { ELogType, LoggingService } from 'src/common/logging/file.logging'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ usernameField: 'mail' })
  }
  @Inject(AuthService)
  private readonly authService: AuthService

  private readonly loggingService = new LoggingService(ELogType.login)

  async validate(mail: string, password: string, callback: CallableFunction) {
    let user: User

    if (!mail)
      throw new ExceptionInvalidCredentials('Local OAuth20 failed: no mail')
    if (!password)
      throw new ExceptionInvalidCredentials('Local OAuth20 failed: no password')

    try {
      user = await this.authService.validateLocalUser(mail, password)
    } catch (e) {
      throw e
    }
    if (!user) {
      throw new ExceptionInvalidCredentials(
        'Local OAuth20 failed: user not found'
      )
    }
    this.loggingService.log('-- Local Auth --')
    return callback(null, user)
  }
}
