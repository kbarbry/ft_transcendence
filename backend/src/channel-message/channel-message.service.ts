import { Injectable } from '@nestjs/common'
import { ChannelMessage, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { ExceptionTryingToUpdateID } from '../user/exceptions/channel-message.exception'

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

  async findAllFromChannel(channelId: string) {
    return this.prisma.channelMessage.findMany({
      where: {
        channelId
      }
    })
  }

  async findAllFromChannelIdsAndUserId(channelId: string, senderId: string) {
    return this.prisma.channelMessage.findMany({
      where: {
        AND: [{ channelId, senderId }]
      }
    })
  }

  findContain(channelId: string, containingText: string) {
    return this.prisma.channelMessage.findMany({
      where: {
        content: {
          contains: containingText
        }
      }
    })
  }

  async update(
    id: string,
    data: Prisma.ChannelMessageUpdateInput
  ): Promise<ChannelMessage> {
    if (data.id) throw new ExceptionTryingToUpdateID()
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
