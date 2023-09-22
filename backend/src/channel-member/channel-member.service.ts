import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, ChannelMember } from '@prisma/client'

@Injectable()
export class ChannelMemberService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(data: Prisma.ChannelMemberCreateInput): Promise<ChannelMember> {
    return this.prisma.channelMember.create({
      data
    })
  }

  async update(
    userId: string,
    channelId: string,
    data: Prisma.ChannelMemberUpdateInput
  ): Promise<ChannelMember> {
    return this.prisma.channelMember.update({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      },
      data
    })
  }

  async delete(userId: string, channelId: string): Promise<ChannelMember> {
    return this.prisma.channelMember.delete({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      }
    })
  }
  //**************************************************//
  //  QUERY
  //**************************************************//
  async findOne(
    userId: string,
    channelId: string
  ): Promise<ChannelMember | null> {
    return this.prisma.channelMember.findUnique({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      }
    })
  }

  async findAllInChannel(channelId: string): Promise<ChannelMember[]> {
    return this.prisma.channelMember.findMany({
      where: {
        channelId
      }
    })
  }
}
