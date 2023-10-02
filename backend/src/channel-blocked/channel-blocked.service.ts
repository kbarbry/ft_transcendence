import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ChannelBlocked, Prisma } from '@prisma/client'
import { ExceptionTryingToBlockChannelOwner } from '../channel/exceptions/blocked.exception'

@Injectable()
export class ChannelBlockedService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(
    data: Prisma.ChannelBlockedCreateInput
  ): Promise<ChannelBlocked> {
    const userId = data.user.connect?.id as string
    const channelId = data.channel.connect?.id as string
    const channel = await this.prisma.channel.findUnique({
      where: { id: channelId }
    })
    const userMember = await this.prisma.channelMember.findUnique({
      where: { userId_channelId: { userId, channelId } }
    })
    const userInvited = await this.prisma.channelInvited.findUnique({
      where: { userId_channelId: { userId, channelId } }
    })
    if (userMember) {
      await this.prisma.channelMember.delete({
        where: { userId_channelId: { userId, channelId } }
      })
    }
    if (userInvited) {
      await this.prisma.channelInvited.delete({
        where: { userId_channelId: { userId, channelId } }
      })
    }
    if (userId === channel?.ownerId) {
      throw new ExceptionTryingToBlockChannelOwner()
    }
    return this.prisma.channelBlocked.create({ data })
  }

  async delete(userId: string, channelId: string): Promise<ChannelBlocked> {
    return this.prisma.channelBlocked.delete({
      where: { userId_channelId: { userId, channelId } }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findOne(
    userId: string,
    channelId: string
  ): Promise<ChannelBlocked | null> {
    return this.prisma.channelBlocked.findUnique({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      }
    })
  }

  async findAllInChannel(channelId: string): Promise<ChannelBlocked[]> {
    return this.prisma.channelBlocked.findMany({
      where: {
        channelId
      }
    })
  }
}
