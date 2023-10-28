import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './strategies/google.strategy'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService]
})
export class AuthModule {}
