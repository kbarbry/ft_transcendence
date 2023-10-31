import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './guards/google.guard'
import { AuthorizationGuard } from './guards/authorization.guard'
import { Request } from 'express'
import { GithubOauthGuard } from './guards/github.guard'

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

  @Get('github')
  @UseGuards(GithubOauthGuard)
  async githubAuth() {
    // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-github strategy.
    // The Guard initiates the passport-github flow.
  }

  @Get('github/redirect')
  @UseGuards(GithubOauthGuard)
  async githubAuthCallback(@Req() req: Request) {
    // Passport automatically creates a `user` object, based on the return value of our
    // GithubOauthStrategy#validate() method, and assigns it to the Request object as `req.user`

    const user = req.user

    // TODO delete
    console.log(
      `${this.githubAuthCallback.name}(): req.user = ${JSON.stringify(
        user,
        null,
        4
      )}`
    )
  }
}
