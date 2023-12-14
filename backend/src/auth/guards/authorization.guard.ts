import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException
} from '@nestjs/common'
import { EMemberType } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
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
        return true // Skip guard for operations marked as unprotected
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

@Injectable()
export class ChannelAdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const userId = request?.user?.id as string
      // wrong data, must be tested
      const channelId = request?.params?.channelId as string

      if (!userId || !channelId) {
        throw new UnauthorizedException('Invalid user or channel information')
      }

      const channelMember = await this.prisma.channelMember.findUnique({
        where: {
          userId_channelId: {
            userId,
            channelId
          }
        }
      })

      if (channelMember && channelMember.type === EMemberType.Admin) return true
      throw new UnauthorizedException('User is not an admin in the channel')
    } catch (e) {
      throw new UnauthorizedException('User authentication failed')
    }
  }
}

@Injectable()
export class ChannelOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const userId = request?.user?.id as string
      // wrong data, must be tested
      const channelId = request?.params?.channelId as string

      if (!userId || !channelId) {
        throw new UnauthorizedException('Invalid user or channel information')
      }

      const channel = await this.prisma.channel.findUnique({
        where: {
          id: channelId
        }
      })

      if (channel && channel.ownerId === userId) return true
      throw new UnauthorizedException('User is not the owner in the channel')
    } catch (e) {
      throw new UnauthorizedException('User authentication failed')
    }
  }
}
