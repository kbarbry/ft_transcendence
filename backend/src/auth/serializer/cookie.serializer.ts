import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { User } from '@prisma/client'
import { UserService } from 'src/user/user.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  @Inject(AuthService)
  private readonly authService: AuthService

  @Inject(UserService)
  private readonly userService: UserService

  serializeUser(user: User, done: CallableFunction) {
    console.log('serializer')
    done(null, user)
  }

  async deserializeUser(payload: any, done: CallableFunction) {
    console.log('deserializer')
    const user = await this.userService.findOne(payload.id)
    return done(null, user)
  }
}
