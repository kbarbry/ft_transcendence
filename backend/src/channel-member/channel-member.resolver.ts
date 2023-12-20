import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription
} from '@nestjs/graphql'
import { ChannelMember } from './entities/channel-member.entity'
import { ChannelMemberService } from './channel-member.service'
import { CreateChannelMemberInput } from './dto/create-channel-member.input'
import { UpdateChannelMemberInput } from './dto/update-channel-member.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'
import {
  ForbiddenAccessChannelAdmin,
  ForbiddenAccessChannelOwner,
  ForbiddenAccessData,
  channelAdminGuard,
  channelOwnerGuard,
  userContextGuard
} from 'src/auth/guards/request.guards'
import { PrismaService } from 'src/prisma/prisma.service'
import { ExceptionTryingToDeleteChannelOwner } from 'src/channel/exceptions/channel-member.exceptions'
import * as bcrypt from 'bcrypt'
import { ExceptionWrongChannelPassword } from 'src/channel/exceptions/channel.exception'

@Resolver(() => ChannelMember)
@UseGuards(AuthorizationGuard)
export class ChannelMemberResolver {
  constructor(
    private readonly channelMemberService: ChannelMemberService,
    private readonly pubSub: PubSub,
    private readonly prisma: PrismaService
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => ChannelMember, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelMemberCreation(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    return this.pubSub.asyncIterator('memberReceived-' + id)
  }

  @Subscription(() => ChannelMember, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelMemberEdition(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    return this.pubSub.asyncIterator('memberEdited-' + id)
  }

  @Subscription(() => ChannelMember, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelMemberDeletion(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    return this.pubSub.asyncIterator('memberDeleted-' + id)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => ChannelMember)
  async createChannelMember(
    @Args('data', { type: () => CreateChannelMemberInput }, ValidationPipe)
    data: CreateChannelMemberInput,
    @Context() ctx: any
  ): Promise<ChannelMember> {
    if (!userContextGuard(ctx?.req?.user?.id, data.userId))
      throw new ForbiddenAccessData()

    const channel = await this.prisma.channel.findUnique({
      where: { id: data.channelId }
    })

    if (channel?.password) {
      if (
        !(await bcrypt.compare(
          data.channelPassword as string,
          channel.password
        ))
      ) {
        throw new ExceptionWrongChannelPassword()
      }
    }

    const { channelPassword, ...dataWithoutPassword } = data

    const res = await this.channelMemberService.create(dataWithoutPassword)

    const channelMembers = await this.findAllChannelMemberInChannel(
      data.channelId
    )
    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('memberReceived-' + value.userId, { res })
      })
    )

    await this.pubSub.publish('memberReceived-' + res.userId, { res })

    return res
  }

  @Mutation(() => ChannelMember)
  async updateChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Args('data', { type: () => UpdateChannelMemberInput }, ValidationPipe)
    data: UpdateChannelMemberInput,
    @Context() ctx: any
  ): Promise<ChannelMember> {
    if (!userContextGuard(ctx?.req?.user?.id, userId))
      throw new ForbiddenAccessData()
    const res = await this.channelMemberService.update(userId, channelId, data)

    const channelMembers = await this.findAllChannelMemberInChannel(channelId)
    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('memberEdited-' + value.userId, { res })
      })
    )

    return res
  }

  @Mutation(() => ChannelMember)
  async deleteChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Context() ctx: any
  ): Promise<ChannelMember> {
    if (
      !(await channelAdminGuard(ctx?.req?.user?.id, channelId, this.prisma)) &&
      !userContextGuard(ctx?.req?.user?.id, userId)
    )
      throw new ForbiddenAccessData()

    const channel = await this.prisma.channel.findUnique({
      where: { id: channelId }
    })

    if (!channel || channel.ownerId === userId)
      throw new ExceptionTryingToDeleteChannelOwner()

    const res = await this.channelMemberService.delete(userId, channelId)

    const channelMembers = await this.findAllChannelMemberInChannel(channelId)
    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('memberDeleted-' + value.userId, { res })
      })
    )

    await this.pubSub.publish('memberDeleted-' + userId, { res })
    return res
  }

  @Mutation(() => ChannelMember)
  async unmakeChannelMemberAdmin(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Context() ctx: any
  ): Promise<ChannelMember> {
    if (!(await channelOwnerGuard(ctx?.req?.user?.id, channelId, this.prisma)))
      throw new ForbiddenAccessChannelOwner()
    const res = await this.channelMemberService.unmakeAdmin(userId, channelId)

    const channelMembers = await this.findAllChannelMemberInChannel(channelId)
    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('memberEdited-' + value.userId, { res })
      })
    )

    await this.pubSub.publish('memberEdited-' + channelId, { res })
    return res
  }

  @Mutation(() => ChannelMember)
  async makeChannelMemberAdmin(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Context() ctx: any
  ): Promise<ChannelMember> {
    if (!(await channelOwnerGuard(ctx?.req?.user?.id, channelId, this.prisma)))
      throw new ForbiddenAccessChannelOwner()
    const res = await this.channelMemberService.makeAdmin(userId, channelId)

    const channelMembers = await this.findAllChannelMemberInChannel(channelId)
    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('memberEdited-' + value.userId, { res })
      })
    )

    await this.pubSub.publish('memberEdited-' + channelId, { res })
    return res
  }

  @Mutation(() => ChannelMember)
  async muteChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Context() ctx: any
  ): Promise<ChannelMember> {
    if (!(await channelAdminGuard(ctx?.req?.user?.id, channelId, this.prisma)))
      throw new ForbiddenAccessChannelAdmin()
    const res = await this.channelMemberService.mute(userId, channelId)

    const channelMembers = await this.findAllChannelMemberInChannel(channelId)
    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('memberEdited-' + value.userId, { res })
      })
    )

    await this.pubSub.publish('memberEdited-' + channelId, { res })
    return res
  }

  @Mutation(() => ChannelMember)
  async unmuteChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Context() ctx: any
  ): Promise<ChannelMember> {
    if (!(await channelAdminGuard(ctx?.req?.user?.id, channelId, this.prisma)))
      throw new ForbiddenAccessChannelAdmin()
    const res = await this.channelMemberService.unmute(userId, channelId)

    const channelMembers = await this.findAllChannelMemberInChannel(channelId)
    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('memberEdited-' + value.userId, { res })
      })
    )

    await this.pubSub.publish('memberEdited-' + channelId, { res })
    return res
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => ChannelMember)
  async findOneChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember | null> {
    return this.channelMemberService.findOne(userId, channelId)
  }

  @Query(() => [ChannelMember])
  async findAllChannelMemberOfUser(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string
  ): Promise<ChannelMember[]> {
    return this.channelMemberService.findAllChannelMemberofUser(userId)
  }

  @Query(() => [ChannelMember])
  async findAllChannelMemberInChannel(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember[]> {
    return this.channelMemberService.findAllInChannel(channelId)
  }
}
