import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException
} from '@nestjs/common'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest()
      if (request.user) return true
      throw new UnauthorizedException('User not authenticated')
    } catch (e) {
      throw new UnauthorizedException('User authentication failed')
    }
  }
}
