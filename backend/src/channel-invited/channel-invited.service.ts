import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ChannelInvited } from '@prisma/client'
import {
  ExceptionUserAlreadyInChannel,
  ExceptionUserAlreadyInvited
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
    const userInvited = await this.prisma.channelInvited.findUnique({
      where: { userId_channelId: { userId, channelId } }
    })
    const userMember = await this.prisma.channelMember.findUnique({
      where: { userId_channelId: { userId, channelId } }
    })
    const userBlocked = await this.prisma.channelBlocked.findUnique({
      where: { userId_channelId: { userId, channelId } }
    })

    if (userInvited) throw new ExceptionUserAlreadyInvited()
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

  async findAllChannelInvitedofUser(userId: string): Promise<ChannelInvited[]> {
    return this.prisma.channelInvited.findMany({
      where: {
        userId
      }
    })
  }

  async findAllInChannel(channelId: string): Promise<ChannelInvited[]> {
    return this.prisma.channelInvited.findMany({
      where: {
        channelId
      }
    })
  }
}
