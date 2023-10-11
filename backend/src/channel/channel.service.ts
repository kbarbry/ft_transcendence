import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Channel } from '@prisma/client'
import { CreateChannelInput } from './dto/create-channel.input'
import {
  UpdateChannelInput,
  UpdateChannelOwnerIdInput
} from './dto/update-channel.input'

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: CreateChannelInput): Promise<Channel> {
    return this.prisma.channel.create({
      data
    })
  }

  async update(id: string, data: UpdateChannelInput): Promise<Channel> {
    return this.prisma.channel.update({
      where: {
        id
      },
      data
    })
  }

  async updateOwner(
    id: string,
    data: UpdateChannelOwnerIdInput
  ): Promise<Channel | null> {
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

  async findAllThatContain(str: string): Promise<Channel[] | null> {
    return await this.prisma.channel.findMany({
      where: {
        name: { contains: str }
      },
      orderBy: {
        name: 'desc'
      }
    })
  }

  async findOwner(channelId: string): Promise<string | null> {
    const channel = await this.prisma.channel.findUnique({
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
