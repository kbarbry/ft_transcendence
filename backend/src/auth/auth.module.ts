import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './strategies/google.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { SessionSerializer } from './serializer/cookie.serializer'
import { GithubStrategy } from './strategies/github.strategy'
import { FortyTwoStrategy } from './strategies/42.strategy'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, LocalStrategy, GithubStrategy, FortyTwoStrategy, AuthService, SessionSerializer]
})
export class AuthModule {}
