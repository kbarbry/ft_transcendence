import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql'
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

@Resolver(() => ChannelInvited)
@UseGuards(AuthorizationGuard)
export class ChannelInvitedResolver {
  constructor(
    private readonly channelInvitedService: ChannelInvitedService,
    private readonly pubSub: PubSub
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
    data: CreateChannelInvitedInput
  ): Promise<ChannelInvited> {
    return this.channelInvitedService.create(data)
  }

  @Mutation(() => ChannelInvited)
  async deleteChannelInvited(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelInvited> {
    return this.channelInvitedService.delete(userId, channelId)
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
