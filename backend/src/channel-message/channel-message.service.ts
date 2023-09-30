import { Injectable } from '@nestjs/common'
import { ChannelMessage, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import {
  ChannelMessageExceptionEmptyMessage,
  ChannelMessageExceptionTryingToUpdateChannelID,
  ChannelMessageExceptionTryingToUpdateCreationDate,
  ChannelMessageExceptionTryingToUpdateID,
  ChannelMessageExceptionTryingToUpdateSenderID
} from '../user/exceptions/channel-message.exception'

@Injectable()
export class ChannelMessageService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.ChannelMessageCreateInput
  ): Promise<ChannelMessage> {
    return this.prisma.channelMessage.create({
      data
    })
  }

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
      }
    })
  }

  async findInChannelIdsAndUserId(
    channelId: string,
    senderId: string
  ): Promise<ChannelMessage[]> {
    return this.prisma.channelMessage.findMany({
      where: {
        AND: [{ channelId, senderId }]
      }
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
      }
    })
  }

  async update(
    id: string,
    data: Prisma.ChannelMessageUpdateInput
  ): Promise<ChannelMessage> {
    if (data.id) {
      throw new ChannelMessageExceptionTryingToUpdateID()
    }
    if (data.channel) {
      throw new ChannelMessageExceptionTryingToUpdateChannelID()
    }
    if (!data.content || data.content?.toString().length == 0) {
      throw new ChannelMessageExceptionEmptyMessage()
    }
    if (data.createdAt) {
      throw new ChannelMessageExceptionTryingToUpdateCreationDate()
    }
    if (data.user) {
      throw new ChannelMessageExceptionTryingToUpdateSenderID()
    }
    if (!data.updatedAt) {
      data.updatedAt = new Date()
    }
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
}
