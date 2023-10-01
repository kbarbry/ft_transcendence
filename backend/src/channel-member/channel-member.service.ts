import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, ChannelMember } from '@prisma/client'
import { ChannelBlockedService } from '../channel-blocked/channel-blocked.service'
import { ChannelInvitedService } from '../channel-invited/channel-invited.service'

@Injectable()
export class ChannelMemberService {
  constructor(private prisma: PrismaService) {}

  @Inject(ChannelBlockedService)
  private readonly channelBlockedService: ChannelBlockedService

  @Inject(ChannelInvitedService)
  private readonly channelInvitedService: ChannelInvitedService

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(data: Prisma.ChannelMemberCreateInput): Promise<ChannelMember> {
    const userBlocked = await this.channelBlockedService.findOne(
      'ftrX94_NVjmzVm9QL3k4r',
      // data.user.connect?.id as string,
      data.channel.connect?.id as string
    )
    console.log(userBlocked, 'user is blocked')
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
