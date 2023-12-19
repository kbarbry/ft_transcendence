import { ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export class School42AuthGuard extends AuthGuard('42') {
  async canActivate(context: ExecutionContext) {
    try {
      const activate = (await super.canActivate(context)) as boolean
      return activate
    } catch (error) {
      const request = context.switchToHttp().getRequest()
      request.needsRedirect = true
      return true
    }
  }
}
