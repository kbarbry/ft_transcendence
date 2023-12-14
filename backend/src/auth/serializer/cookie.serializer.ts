import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ExceptionInvalidCredentials } from 'src/common/exceptions/unauthorized-strategy.exception'
import { ELogType, LoggingService } from 'src/common/logging/file.logging'
import { UserService } from 'src/user/user.service'

export class MinimalUserData {
  id: string
  validation2fa: boolean
  mail: string
  username: string
  createdAt: Date
  secretMessage: string
}

export function setMinimalUserData(user: User): MinimalUserData {
  return {
    id: user.id,
    mail: user.mail,
    validation2fa: user.validation2fa,
    username: user.username,
    createdAt: user.createdAt,
    secretMessage: 'Too bad... We thought about it...'
  }
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  @Inject(UserService)
  private readonly userService: UserService

  private readonly loggingService = new LoggingService(ELogType.login)

  serializeUser(user: User, done: CallableFunction) {
    const minimalUserData: MinimalUserData = setMinimalUserData(user)
    try {
      this.loggingService.log(JSON.stringify(minimalUserData))
      done(null, minimalUserData)
    } catch (e) {
      this.loggingService.log('- serializer crashed -')
      throw e
    }
  }

  async deserializeUser(payload: MinimalUserData, done: CallableFunction) {
    try {
      const user = await this.userService.findOne(payload.id)
      if (!user)
        throw new ExceptionInvalidCredentials('OAuth20 failed: user not found')
      const minimalUserData: MinimalUserData = setMinimalUserData(user)
      return done(null, minimalUserData)
    } catch (e) {
      this.loggingService.log('- deserializer crashed -')
      throw e
    }
  }
}
