import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './strategies/google.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { SessionSerializer } from './serializer/cookie.serializer'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, LocalStrategy, AuthService, SessionSerializer]
})
export class AuthModule {}
