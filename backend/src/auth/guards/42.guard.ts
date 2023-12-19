import {
  Injectable,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class School42AuthGuard extends AuthGuard('42') {
  async canActivate(context: ExecutionContext) {
    try {
      const activate = (await super.canActivate(context)) as boolean
      const request = context.switchToHttp().getRequest()
      await super.logIn(request)
      return activate
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        const response = context.switchToHttp().getResponse()
        response.redirect('http://127.0.0.1:5173/')
      }
      throw err
    }
  }
}
