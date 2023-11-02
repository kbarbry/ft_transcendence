import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { GoogleAuthGuard } from './guards/google.guard'
import { School42AuthGuard } from './guards/42.guard'
import { AuthorizationGuard } from './guards/authorization.guard'
import { GithubGuard } from './guards/github.guard'
import { LocalAuthGuard } from './guards/local.guard'
import { AuthService } from './auth.service'
import { User } from 'src/user/entities/user.entity'
import { CreateUserAuthInput } from './dto/create-user-auth.input'

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Get('register')
  getRegister() {
    return 'Register page'
  }

  @Post('register')
  async postRegister(reqUserInput: CreateUserAuthInput): Promise<User> {
    const user: User = await this.authService.createUser(reqUserInput)
    //handle error

    return user //return user with 201 and open session
  }

  @Get('login')
  getLogin() {
    return { msg: 'Local Auth Login' }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return { msg: 'Local Auth Login', user: req.user }
  }

  @Get('42/login')
  @UseGuards(School42AuthGuard)
  ftLogin() {
    return { msg: '42 Auth Login' }
  }

  @Get('42/redirect')
  @UseGuards(School42AuthGuard)
  ftRedirect() {
    return { msg: '42 OK' }
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  getGoogleAuth() {
    return { msg: 'Google Auth Login' }
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  getGoogleCallback() {
    return { msg: 'Google OK' }
  }

  @Get('github/login')
  @UseGuards(GithubGuard)
  async getGithubAuth() {
    return { msg: 'GitHub Auth Login' }
  }

  @Get('github/redirect')
  @UseGuards(GithubGuard)
  async getGithubAuthCallback() {
    return { msg: 'GitHub OK' }
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
