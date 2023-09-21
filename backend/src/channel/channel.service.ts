import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, Channel, EGameType } from '@prisma/client'

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.ChannelCreateInput): Promise<Channel> {
    return this.prisma.channel.create({
      data
    })
  }

  async update(id: string, data: Prisma.ChannelUpdateInput): Promise<Channel> {
    return this.prisma.channel.update({
      where: {
        id
      },
      data
    })
  }

  async delete(id: string): Promise<Channel> {
    return this.prisma.channel.delete({
      where: {
        id
      }
    })
  }
}
