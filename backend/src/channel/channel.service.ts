import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Channel } from '@prisma/client'
import { CreateChannelInput } from './dto/create-channel.input'
import {
  UpdateChannelInput,
  UpdateChannelOwnerIdInput
} from './dto/update-channel.input'
import { ExceptionUserNotFound } from './exceptions/channel-member.exceptions'
import {
  ExceptionChannelMemberNotCreatedInChannelCreation,
  ExceptionInvalidMaxUserInChannel
} from './exceptions/channel.exception'

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: CreateChannelInput): Promise<Channel> {
    const channel = await this.prisma.channel.create({
      data
    })
    const userOwner = await this.prisma.user.findUnique({
      where: { id: data.ownerId }
    })
    if (!userOwner) throw new ExceptionUserNotFound()
    const channelMember = await this.prisma.channelMember.create({
      data: {
        avatarUrl: userOwner.avatarUrl,
        nickname: userOwner.username,
        userId: userOwner.id,
        channelId: channel.id,
        type: 'Admin'
      }
    })
    if (!channelMember) {
      await this.prisma.channel.delete({ where: { id: channel.id } })
      throw new ExceptionChannelMemberNotCreatedInChannelCreation()
    }
    return channel
  }

  async update(id: string, data: UpdateChannelInput): Promise<Channel> {
    const userCount = (
      await this.prisma.channelMember.findMany({
        where: {
          channelId: id
        }
      })
    ).length
    if (data.maxUsers && data.maxUsers < userCount)
      throw new ExceptionInvalidMaxUserInChannel()
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

  async findOneByUsername(name: string): Promise<Channel | null> {
    return this.prisma.channel.findUnique({
      where: {
        name
      }
    })
  }

  async findChannelByChannelIds(channelIds: string[]): Promise<Channel[]> {
    return this.prisma.channel.findMany({
      where: {
        id: {
          in: channelIds
        }
      }
    })
  }

  async findAllThatContain(str: string): Promise<Channel[]> {
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

  async findAllChannelOfOwner(id: string): Promise<Channel[]> {
    return this.prisma.channel.findMany({
      where: {
        ownerId: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async isChannelPasswordSet(channelid: string): Promise<boolean> {
    const res = await this.prisma.channel.findUnique({
      where: { id: channelid }
    })

    return res?.password ? true : false
  }
}
