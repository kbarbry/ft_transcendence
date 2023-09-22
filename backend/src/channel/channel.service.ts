import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, Channel, EGameType } from '@prisma/client'
import { ChannelMemberModule } from 'src/channel-member/channel-member.module'

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

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findOne(id: string): Promise<Channel | null> {
    return this.prisma.channel.findUnique({
      where: {
        id
      }
    })
  }

  //Need Channel member
  //   async findAll(id: string): Promise<Channel> {
  //     where: {
  //       ChannelMemberModule
  //     }
  //   }

  async findOwner(channelId: string): Promise<string | null> {
    const channel = await this.prisma.channel.findFirst({
      where: {
        id: channelId
      }
    })

    return channel ? channel.ownerId : null
  }

  async findAllChannelOfOwner(id: string): Promise<Channel[] | null> {
    return this.prisma.channel.findMany({
      where: {
        ownerId: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
