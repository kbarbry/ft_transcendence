import { ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export class School42AuthGuard extends AuthGuard('42') {
  async canActivate(context: ExecutionContext) {
    try {
      console.log('HERE Guard42')

      const activate = (await super.canActivate(context)) as boolean
      const request = context.switchToHttp().getRequest()
      await super.logIn(request)
      return activate
    } catch (error) {
      const request = context.switchToHttp().getRequest()
      request.needsRedirect = true
      return true
    }
  }
}
