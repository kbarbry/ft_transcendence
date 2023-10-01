import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ChannelInvited, Prisma } from '@prisma/client'

@Injectable()
export class ChannelInvitedService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(
    data: Prisma.ChannelInvitedCreateInput
  ): Promise<ChannelInvited> {
    return this.prisma.channelInvited.create({ data })
  }

  async delete(userId: string, channelId: string): Promise<ChannelInvited> {
    return this.prisma.channelInvited.delete({
      where: { userId_channelId: { userId, channelId } }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findOne(
    userId: string,
    channelId: string
  ): Promise<ChannelInvited | null> {
    return this.prisma.channelInvited.findUnique({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      }
    })
  }

  async findAllInChannel(channelId: string): Promise<ChannelInvited[]> {
    return this.prisma.channelInvited.findMany({
      where: {
        channelId
      }
    })
  }
}
