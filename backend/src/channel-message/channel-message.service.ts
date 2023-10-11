import { Injectable } from '@nestjs/common'
import { ChannelMessage } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateChannelMessageInput } from './dto/create-channel-message.input'
import { UpdateChannelMessageInput } from './dto/update-channel-message.input'

@Injectable()
export class ChannelMessageService {
  constructor(private prisma: PrismaService) {}

  async create(
    createChannelMessageInput: CreateChannelMessageInput
  ): Promise<ChannelMessage> {
    return this.prisma.channelMessage.create({
      data: {
        content: createChannelMessageInput.content,
        user: { connect: { id: createChannelMessageInput.userId } },
        channel: { connect: { id: createChannelMessageInput.channelId } }
      }
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
    updateChannelMessageInput: UpdateChannelMessageInput
  ): Promise<ChannelMessage> {
    return this.prisma.channelMessage.update({
      where: {
        id
      },
      data: {
        content: updateChannelMessageInput.content
      }
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
