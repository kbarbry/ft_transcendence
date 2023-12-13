import {
  Args,
  Mutation,
  Resolver,
  Query,
  Subscription,
  Context
} from '@nestjs/graphql'
import { ChannelInvited } from './entities/channel-invited.entity'
import { ChannelInvitedService } from './channel-invited.service'
import { CreateChannelInvitedInput } from './dto/create-channel-invited.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  ForbiddenAccessChannelAdmin,
  channelAdminGuard,
  userContextGuard
} from 'src/auth/guards/request.guards'

@Resolver(() => ChannelInvited)
@UseGuards(AuthorizationGuard)
export class ChannelInvitedResolver {
  constructor(
    private readonly channelInvitedService: ChannelInvitedService,
    private readonly pubSub: PubSub,
    private prisma: PrismaService
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => ChannelInvited, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelInvitedCreation(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    console.log('channelInvitedCreation sub')
    return this.pubSub.asyncIterator('invitationReceived-' + id)
  }

  @Subscription(() => ChannelInvited, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelInvitedDeletion(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    console.log('channelInvitedDeletion sub')
    return this.pubSub.asyncIterator('invitationDeleted-' + id)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => ChannelInvited)
  async createChannelInvited(
    @Args('data', { type: () => CreateChannelInvitedInput }, ValidationPipe)
    data: CreateChannelInvitedInput,
    @Context() ctx: any
  ): Promise<ChannelInvited> {
    if (
      !(await channelAdminGuard(
        ctx?.req?.user?.id,
        data.channelId,
        this.prisma
      ))
    )
      throw new ForbiddenAccessChannelAdmin()
    const res = await this.channelInvitedService.create(data)

    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: data.channelId }
    })

    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('invitationReceived-' + value.userId, { res })
      })
    )

    await this.pubSub.publish('invitationReceived-' + data.userId, { res })

    return res
  }

  @Mutation(() => ChannelInvited)
  async deleteChannelInvited(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Context() ctx: any
  ): Promise<ChannelInvited> {
    console.log('userId:', userId)
    console.log('userIdcontext:', ctx?.req?.user?.id)
    if (
      !(await channelAdminGuard(ctx?.req?.user?.id, channelId, this.prisma)) &&
      !userContextGuard(ctx?.req?.user?.id, userId)
    )
      throw new ForbiddenAccessChannelAdmin()
    const res = await this.channelInvitedService.delete(userId, channelId)

    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId }
    })

    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('invitationDeleted-' + value.userId, { res })
      })
    )

    await this.pubSub.publish('invitationDeleted-' + userId, { res })

    return res
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => ChannelInvited)
  async findOneChannelInvited(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelInvited | null> {
    return this.channelInvitedService.findOne(userId, channelId)
  }

  @Query(() => [ChannelInvited])
  async findAllChannelInvitedOfUser(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string
  ): Promise<ChannelInvited[]> {
    return this.channelInvitedService.findAllChannelInvitedofUser(userId)
  }

  @Query(() => [ChannelInvited])
  async findAllChannelInvitedInChannel(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelInvited[]> {
    return this.channelInvitedService.findAllInChannel(channelId)
  }
}
