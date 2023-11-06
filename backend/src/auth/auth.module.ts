import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './strategies/google.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { SessionSerializer } from './serializer/cookie.serializer'
import { GithubStrategy } from './strategies/github.strategy'
import { School42Strategy } from './strategies/42.strategy'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    LocalStrategy,
    GithubStrategy,
    School42Strategy,
    AuthService,
    SessionSerializer,
    PrismaService
  ]
})
export class AuthModule {}
