import { Injectable } from '@nestjs/common'
import { ChannelMessage } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ChannelMessageService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<ChannelMessage | null> {
    return this.prisma.channelMessage.findUnique({
      where: {
        id
      }
    })
  }

  //create
  //findAllFromChannel
  //update
  //delete
}
