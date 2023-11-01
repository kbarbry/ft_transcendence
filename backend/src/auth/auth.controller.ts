import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './guards/google.guard'
import { FortyTwoAuthGuard } from './guards/42.guard'
import { AuthorizationGuard } from './guards/authorization.guard'
import { Request } from 'express'
import { LocalAuthGuard } from './guards/local.guard'

@Controller('auth')
export class AuthController {
  @Get('login')
  getLogin() {
    return 'Login page'
  }

  @Get('42/login')
  @UseGuards(FortyTwoAuthGuard)
  ftLogin() {
    return { msg: '42 Auth Login' }
  }

  @Get('42/redirect')
  @UseGuards(FortyTwoAuthGuard)
  ftRedirect() {
    return { msg: '42 OK' }
  }

  @Get('register')
  getRegister() {
    return 'Register page'
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    console.log('USER INFO REQUEST')
    console.log(req.user)
    return req.user
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
