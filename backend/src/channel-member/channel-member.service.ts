import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ChannelMember, EMemberType } from '@prisma/client'
import { CreateChannelMemberInput } from './dto/create-channel-member.input'
import { UpdateChannelMemberInput } from './dto/update-channel-member.input'
import { ChannelBlockedService } from '../channel-blocked/channel-blocked.service'
import { ChannelInvitedService } from '../channel-invited/channel-invited.service'
import { ChannelService } from '../channel/channel.service'
import { UserService } from '../user/user.service'
import { ExceptionUserBlockedInChannel } from '../channel/exceptions/blocked.exception'
import { ExceptionMaxUserReachedInChannel } from '../channel/exceptions/channel.exception'
import {
  ExceptionTryingToMakeAdminAnAdmin,
  ExceptionTryingToMuteAMuted,
  ExceptionTryingToUnmuteAnUnmuted,
  ExceptionTryingToUnmakeAdminAMember,
  ExceptionUserNotFound,
  ExceptionTryingToUnmakeAdminTheOwner
} from '../channel/exceptions/channel-member.exceptions'

@Injectable()
export class ChannelMemberService {
  constructor(private prisma: PrismaService) {}

  @Inject(ChannelBlockedService)
  private readonly channelBlockedService: ChannelBlockedService

  @Inject(ChannelInvitedService)
  private readonly channelInvitedService: ChannelInvitedService

  @Inject(ChannelService)
  private readonly channelService: ChannelService

  @Inject(UserService)
  private readonly userService: UserService

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(data: CreateChannelMemberInput): Promise<ChannelMember> {
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
    const user = await this.userService.findOne(data.userId)

    if (!user) throw new ExceptionUserNotFound()

    if (userBlocked) {
      throw new ExceptionUserBlockedInChannel()
    }

    if (userInvited) await this.channelInvitedService.delete(userId, channelId)

    if (channel && numberMembers >= channel.maxUsers) {
      throw new ExceptionMaxUserReachedInChannel()
    }

    const nickname = data.nickname || user.username
    const avatarUrl = data.avatarUrl || user.avatarUrl

    return this.prisma.channelMember.create({
      data: { nickname, avatarUrl, ...data }
    })
  }

  async update(
    userId: string,
    channelId: string,
    data: UpdateChannelMemberInput
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

  async unmakeAdmin(userId: string, channelId: string): Promise<ChannelMember> {
    const channelMember = await this.prisma.channelMember.findUnique({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      }
    })
    if (channelMember?.type === EMemberType.Member)
      throw new ExceptionTryingToUnmakeAdminAMember()
    if (await this.isOwner(userId, channelId))
      throw new ExceptionTryingToUnmakeAdminTheOwner()
    return this.prisma.channelMember.update({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      },
      data: { type: EMemberType.Member }
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
    if (channelMember?.type === EMemberType.Admin)
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
    if (channelMember?.muted === true) throw new ExceptionTryingToMuteAMuted()
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
    if (channelMember?.muted === false)
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

  async isOwner(userId: string, channelId: string): Promise<boolean> {
    const channel = await this.prisma.channel.findUnique({
      where: { id: channelId }
    })
    if (channel?.ownerId === userId) return true
    return false
  }

  async findAllChannelMemberofUser(userId: string): Promise<ChannelMember[]> {
    return this.prisma.channelMember.findMany({
      where: {
        userId
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
