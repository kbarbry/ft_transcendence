import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './guards/google.guard'
import { AuthorizationGuard } from './guards/authorization.guard'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  @Get('login')
  getLogin() {
    return 'Login page'
  }

  @Get('register')
  getRegister() {
    return 'Register page'
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  gethello() {
    return 'google/login : bite Bonsoir Paris'
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  gethello2() {
    return 'google/redirect : bite Bonsoir Pariiiiis'
  }

  @UseGuards(AuthorizationGuard)
  @Get('status')
  user(@Req() request: Request) {
    if (request.user) {
      return {
        msg: 'Authorized',
        user: request.user
      }
    }
    return {
      msg: 'Unauthorized'
    }
  }
}
