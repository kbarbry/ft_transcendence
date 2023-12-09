import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
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

@Resolver(() => ChannelBlocked)
@UseGuards(AuthorizationGuard)
export class ChannelBlockedResolver {
  constructor(
    private readonly channelBlockedService: ChannelBlockedService,
    private readonly pubSub: PubSub
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
    return this.pubSub.asyncIterator('channelBlockedCreation-' + id)
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
    return this.pubSub.asyncIterator('channelBlockedDeleted-' + id)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => ChannelBlocked)
  async createChannelBlocked(
    @Args('data', { type: () => CreateChannelBlockedInput }, ValidationPipe)
    data: CreateChannelBlockedInput
  ): Promise<ChannelBlocked> {
    return this.channelBlockedService.create(data)
  }

  @Mutation(() => ChannelBlocked)
  async deleteChannelBlocked(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelBlocked> {
    return this.channelBlockedService.delete(userId, channelId)
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
