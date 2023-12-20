import { Injectable, CanActivate, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: GqlExecutionContext) {
    try {
      const isUnprotected = this.reflector.get<boolean>(
        'unprotected',
        context.getHandler()
      )
      const isUnprotected2fa = this.reflector.get<boolean>(
        'unprotected2fa',
        context.getHandler()
      )

      if (isUnprotected) {
        return true
      }

      const gqlContext = GqlExecutionContext.create(context)
      const request = gqlContext.getContext().req

      if (isUnprotected2fa && request.user) return true
      if (request.user && request.user.validation2fa === true) return true

      throw new UnauthorizedException('User not authenticated')
    } catch (e) {
      throw new UnauthorizedException('User authentication failed')
    }
  }
}

export const Unprotected = () => SetMetadata('unprotected', true)
export const Unprotected2fa = () => SetMetadata('unprotected2fa', true)
