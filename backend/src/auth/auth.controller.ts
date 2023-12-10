import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Req,
  UseInterceptors
} from '@nestjs/common'
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

  @Post('2fa/getsecret')
  async getSecret(@Req() req: any, @Res() res: any) {
    try {
      await this.authService.GenerateOTP(req.body.id, res)
    } catch (e) {
      throw e
    }
    return { msg: 'secret set OK' }
  }

  @Post('2fa/verify')
  async verifyOtp(@Req() req: any, @Res() res: any) {
    try {
      await this.authService.VerifyOTP(req.body.id, req.body.token, res)
    } catch (e) {
      throw e
    }
    return { msg: 'verified Otp' }
  }

  @Post('2fa/validate')
  async validateOtp(@Req() req: any, @Res() res: any) {
    try {
      await this.authService.ValidateOTP(req.body.id, req.body.token, res)
    } catch (e) {
      throw e
    }
    return { msg: 'validate Otp' }
  }

  @Post('2fa/disable')
  async disableOtp(@Req() req: any, @Res() res: any) {
    try {
      const is2fa = await this.authService.isUser2fa(req.user.id)
      if (is2fa === true) {
        await this.authService.unset2fa(req.body.id, req.body.token, res)
      }
    } catch (e) {
      throw e
    }
    return { msg: '2fa disabled' }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any, @Res() res: any) {
    const is2fa = await this.authService.isUser2fa(req.user.id)
    if (is2fa === true) {
      this.authService.unset2faValidation(req.user.id)
    }
    return res.status(200).json({ msg: 'Local Auth Login' })
  }

  @Get('logout')
  logout(@Req() req: any, @Res() res: any) {
    req.session.destroy()
    return res.redirect('http://127.0.0.1:5173/')
  }

  @Get('42/login')
  @UseGuards(School42AuthGuard)
  ftLogin(@Res() res: any) {
    return res.status(200).json({ msg: '42 Auth Login' })
  }

  @Get('42/redirect')
  @UseGuards(School42AuthGuard)
  async ftRedirect(@Req() req: any, @Res() res: any) {
    const is2fa = await this.authService.isUser2fa(req.user.id)
    if (is2fa === true) {
      this.authService.unset2faValidation(req.user.id)
      return res.redirect('http://127.0.0.1:5173/2fa/login')
    }
    return res.redirect('http://127.0.0.1:5173')
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  getGoogleAuth(@Res() res: any) {
    return res.status(200).json({ msg: 'Google Auth Login' })
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async getGoogleCallback(@Req() req: any, @Res() res: any) {
    const is2fa = await this.authService.isUser2fa(req.user.id)
    if (is2fa === true) {
      this.authService.unset2faValidation(req.user.id)
      return res.redirect('http://127.0.0.1:5173/2fa/login')
    }
    return res.redirect('http://127.0.0.1:5173')
  }

  @Get('github/login')
  @UseGuards(GithubGuard)
  async getGithubAuth(res: any) {
    return res.status(200).json({ msg: 'Github Auth login' })
  }

  @UseGuards(GithubGuard)
  @Get('github/redirect')
  async getGithubAuthCallback(@Req() req: any, @Res() res: any) {
    const is2fa = await this.authService.isUser2fa(req.user.id)
    if (is2fa === true) {
      this.authService.unset2faValidation(req.user.id)
      return res.redirect('http://127.0.0.1:5173/2fa/login')
    }
    return res.redirect('http://127.0.0.1:5173')
  }
}
