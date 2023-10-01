import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ChannelBlocked, Prisma } from '@prisma/client'

@Injectable()
export class ChannelBlockedService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(
    data: Prisma.ChannelBlockedCreateInput
  ): Promise<ChannelBlocked> {
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
