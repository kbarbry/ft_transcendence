import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException
} from '@nestjs/common'
import { EMemberType } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  async canActivate(context: GqlExecutionContext) {
    try {
      console.log('Authorization guard')
      const gqlContext = GqlExecutionContext.create(context)
      const request = gqlContext.getContext().req

      if (request.user) return true
      throw new UnauthorizedException('User not authenticated')
    } catch (e) {
      throw new UnauthorizedException('User authentication failed')
    }
  }
}

@Injectable()
export class ChannelAdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const userId = request.session?.user?.id as string
      console.log(request)
      // wrong data, must be tested
      const channelId = request.params.channelId as string

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
      const userId = request.session?.user?.id as string
      console.log(request)
      // wrong data, must be tested
      const channelId = request.params.channelId as string

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
