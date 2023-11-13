import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './guards/google.guard'
import { School42AuthGuard } from './guards/42.guard'
import { GithubGuard } from './guards/github.guard'
import { LocalAuthGuard } from './guards/local.guard'
import { AuthService } from './auth.service'
import { CreateUserAuthLocalInput } from './dto/create-user-auth.input'

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('signup')
  async postRegister(@Body() userInput: CreateUserAuthLocalInput) {
    try {
      await this.authService.createUserLocal(userInput)
    } catch (e) {
      throw e
    }
    return { msg: 'Local SignUp OK' }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return { msg: 'Local Auth Login' }
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
}
