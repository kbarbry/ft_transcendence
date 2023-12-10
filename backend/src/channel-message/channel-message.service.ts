import { Injectable } from '@nestjs/common'
import { ChannelMessage } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateChannelMessageInput } from './dto/create-channel-message.input'
import { UpdateChannelMessageInput } from './dto/update-channel-message.input'

@Injectable()
export class ChannelMessageService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(data: CreateChannelMessageInput): Promise<ChannelMessage> {
    return this.prisma.channelMessage.create({
      data
    })
  }

  async update(
    id: string,
    data: UpdateChannelMessageInput
  ): Promise<ChannelMessage> {
    return this.prisma.channelMessage.update({
      where: {
        id
      },
      data
    })
  }

  async delete(id: string): Promise<ChannelMessage> {
    return this.prisma.channelMessage.delete({
      where: {
        id
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findOne(id: string): Promise<ChannelMessage | null> {
    return this.prisma.channelMessage.findUnique({
      where: {
        id
      }
    })
  }

  async findAllInChannel(channelId: string): Promise<ChannelMessage[]> {
    return this.prisma.channelMessage.findMany({
      where: {
        channelId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })
  }

  async findAllInChannelByUser(
    channelId: string,
    senderId: string
  ): Promise<ChannelMessage[]> {
    return this.prisma.channelMessage.findMany({
      where: {
        AND: [{ channelId, senderId }]
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })
  }

  async findAllThatContain(
    channelId: string,
    containingText: string
  ): Promise<ChannelMessage[]> {
    return this.prisma.channelMessage.findMany({
      where: {
        AND: [
          {
            channelId,
            content: { contains: containingText }
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })
  }
}
