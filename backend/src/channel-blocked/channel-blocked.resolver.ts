import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription
} from '@nestjs/graphql'
import { CreateChannelBlockedInput } from './dto/create-channel-blocked.input'
import { ChannelBlocked } from './entities/channel-blocked.entity'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { ChannelBlockedService } from './channel-blocked.service'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  ForbiddenAccessChannelAdmin,
  channelAdminGuard
} from 'src/auth/guards/request.guards'

@Resolver(() => ChannelBlocked)
@UseGuards(AuthorizationGuard)
export class ChannelBlockedResolver {
  constructor(
    private readonly channelBlockedService: ChannelBlockedService,
    private readonly pubSub: PubSub,
    private prisma: PrismaService
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => ChannelBlocked, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelBlockedCreation(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    console.log('channelBlockedCreation sub')
    return this.pubSub.asyncIterator('blockedCreation-' + id)
  }

  @Subscription(() => ChannelBlocked, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelBlockedDeletion(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    console.log('channelBlockedDeletion sub')
    return this.pubSub.asyncIterator('blockedDeleted-' + id)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => ChannelBlocked)
  async createChannelBlocked(
    @Args('data', { type: () => CreateChannelBlockedInput }, ValidationPipe)
    data: CreateChannelBlockedInput,
    @Context() ctx: any
  ): Promise<ChannelBlocked> {
    if (
      !(await channelAdminGuard(
        ctx?.req?.user?.id,
        data.channelId,
        this.prisma
      ))
    )
      throw new ForbiddenAccessChannelAdmin()
    const res = await this.channelBlockedService.create(data)

    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: data.channelId }
    })
    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('blockedCreation-' + value.userId, { res })
      })
    )

    await this.pubSub.publish('blockedCreation-' + data.userId, { res })

    return res
  }

  @Mutation(() => ChannelBlocked)
  async deleteChannelBlocked(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Context() ctx: any
  ): Promise<ChannelBlocked> {
    if (!(await channelAdminGuard(ctx?.req?.user?.id, channelId, this.prisma)))
      throw new ForbiddenAccessChannelAdmin()
    const res = await this.channelBlockedService.delete(userId, channelId)

    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: channelId }
    })
    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('blockedDeleted-' + value.userId, { res })
      })
    )

    return res
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => ChannelBlocked)
  async findOneChannelBlocked(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelBlocked | null> {
    return this.channelBlockedService.findOne(userId, channelId)
  }

  @Query(() => [ChannelBlocked])
  async findAllChannelBlockedOfUser(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string
  ): Promise<ChannelBlocked[]> {
    return this.channelBlockedService.findAllChannelBlockedofUser(userId)
  }

  @Query(() => [ChannelBlocked])
  async findAllInChannelBlocked(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelBlocked[]> {
    return this.channelBlockedService.findAllInChannel(channelId)
  }
}
