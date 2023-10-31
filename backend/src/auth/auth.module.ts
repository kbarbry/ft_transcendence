import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './strategies/google.strategy'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { SessionSerializer } from './serializer/cookie.serializer'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, SessionSerializer]
})
export class AuthModule {}
