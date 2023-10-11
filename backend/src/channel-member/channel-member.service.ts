import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ChannelMember, EChannelType, EMemberType } from '@prisma/client'
import { CreateChannelMemberCreateInput } from './dto/create-channel-member.input'
import { ChannelBlockedService } from '../channel-blocked/channel-blocked.service'
import { ChannelInvitedService } from '../channel-invited/channel-invited.service'
import { ExceptionUserBlockedInChannel } from '../channel/exceptions/blocked.exception'
import { ExceptionUserNotInvited } from '../channel/exceptions/invited.exception'
import { ChannelService } from '../channel/channel.service'
import { ExceptionInvalidMaxUserInChannel } from '../channel/exceptions/channel.exception'
import {
  ExceptionTryingToMakeAdminAnAdmin,
  ExceptionTryingToMuteAMuted,
  ExceptionTryingToUnmuteAnUnmuted
} from '../channel/exceptions/channel-member.exceptions'
import { UpdateChannelMemberCreateInput } from './dto/update-channel-member.input'
@Injectable()
export class ChannelMemberService {
  constructor(private prisma: PrismaService) {}

  @Inject(ChannelBlockedService)
  private readonly channelBlockedService: ChannelBlockedService

  @Inject(ChannelInvitedService)
  private readonly channelInvitedService: ChannelInvitedService

  @Inject(ChannelService)
  private readonly channelService: ChannelService

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(data: CreateChannelMemberCreateInput): Promise<ChannelMember> {
    const userId = data.userId as string
    const channelId = data.channelId as string
    const channel = await this.channelService.findOne(channelId)
    const userBlocked = await this.channelBlockedService.findOne(
      userId,
      channelId
    )
    const userInvited = await this.channelInvitedService.findOne(
      userId,
      channelId
    )
    const numberMembers = (
      await this.prisma.channelMember.findMany({ where: { channelId } })
    ).length
    if (userBlocked) {
      throw new ExceptionUserBlockedInChannel()
    }
    if (channel && channel.type === EChannelType.Protected) {
      if (userInvited)
        await this.channelInvitedService.delete(userId, channelId)
      else throw new ExceptionUserNotInvited()
    }
    if (channel && numberMembers >= channel.maxUsers)
      throw new ExceptionInvalidMaxUserInChannel()
    return this.prisma.channelMember.create({
      data
    })
  }

  async update(
    userId: string,
    channelId: string,
    data: UpdateChannelMemberCreateInput
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

  async makeAdmin(userId: string, channelId: string): Promise<ChannelMember> {
    const channelMember = await this.prisma.channelMember.findUnique({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      }
    })
    if (channelMember?.type == EMemberType.Admin)
      throw new ExceptionTryingToMakeAdminAnAdmin()
    return this.prisma.channelMember.update({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      },
      data: { type: EMemberType.Admin }
    })
  }

  async mute(userId: string, channelId: string): Promise<ChannelMember> {
    const channelMember = await this.prisma.channelMember.findUnique({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      }
    })
    if (channelMember?.muted == true) throw new ExceptionTryingToMuteAMuted()
    return this.prisma.channelMember.update({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      },
      data: { muted: true }
    })
  }

  async unmute(userId: string, channelId: string): Promise<ChannelMember> {
    const channelMember = await this.prisma.channelMember.findUnique({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      }
    })
    if (channelMember?.muted == false)
      throw new ExceptionTryingToUnmuteAnUnmuted()
    return this.prisma.channelMember.update({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      },
      data: { muted: false }
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
