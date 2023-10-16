import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ChannelInvited, EChannelType } from '@prisma/client'
import {
  ExceptionChannelIsNotInProtectedMode,
  ExceptionUserAlreadyInChannel
} from '../channel/exceptions/invited.exception'
import { ExceptionUserBlockedInChannel } from '../channel/exceptions/blocked.exception'
import { CreateChannelInvitedInput } from './dto/create-channel-invited.input'

@Injectable()
export class ChannelInvitedService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(data: CreateChannelInvitedInput): Promise<ChannelInvited> {
    const userId = data.userId
    const channelId = data.channelId
    const channel = await this.prisma.channel.findUnique({
      where: { id: channelId }
    })
    const userMember = await this.prisma.channelMember.findUnique({
      where: { userId_channelId: { userId, channelId } }
    })
    const userBlocked = await this.prisma.channelBlocked.findUnique({
      where: { userId_channelId: { userId, channelId } }
    })

    if (channel && channel.type !== EChannelType.Protected)
      throw new ExceptionChannelIsNotInProtectedMode()
    if (userMember) throw new ExceptionUserAlreadyInChannel()
    if (userBlocked) throw new ExceptionUserBlockedInChannel()

    return this.prisma.channelInvited.create({ data })
  }

  async delete(userId: string, channelId: string): Promise<ChannelInvited> {
    return this.prisma.channelInvited.delete({
      where: { userId_channelId: { userId, channelId } }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findOne(
    userId: string,
    channelId: string
  ): Promise<ChannelInvited | null> {
    return this.prisma.channelInvited.findUnique({
      where: {
        userId_channelId: {
          userId,
          channelId
        }
      }
    })
  }

  async findAllInChannelInvited(channelId: string): Promise<ChannelInvited[]> {
    return this.prisma.channelInvited.findMany({
      where: {
        channelId
      }
    })
  }
}
