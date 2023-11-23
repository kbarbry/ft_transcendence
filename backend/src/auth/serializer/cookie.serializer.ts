import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ExceptionInvalidCredentials } from 'src/common/exceptions/unauthorized-strategy.exception'
import { ELogType, LoggingService } from 'src/common/logging/file.logging'
import { UserService } from 'src/user/user.service'

class MinimalUserData {
  id: string
  mail: string
  username: string
  createdAt: Date
  secretMessage: string
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  @Inject(UserService)
  private readonly userService: UserService

  private readonly loggingService = new LoggingService(ELogType.login)

  private setMinimalUserData(user: User): MinimalUserData {
    return {
      id: user.id,
      mail: user.mail,
      username: user.username,
      createdAt: user.createdAt,
      secretMessage: 'Too bad... We thought about it...'
    }
  }

  serializeUser(user: User, done: CallableFunction) {
    const minimalUserData: MinimalUserData = this.setMinimalUserData(user)
    try {
      console.log('serializer called')
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
      console.log('Deserializer called', payload.id)
      if (!user)
        throw new ExceptionInvalidCredentials('OAuth20 failed: user not found')
      const minimalUserData: MinimalUserData = this.setMinimalUserData(user)
      return done(null, minimalUserData)
    } catch (e) {
      this.loggingService.log('- deserializer crashed -')
      throw e
    }
  }
}
