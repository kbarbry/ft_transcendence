import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql'
import { ChannelService } from './channel.service'
import { Channel } from './entities/channel.entity'
import { CreateChannelInput } from './dto/create-channel.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import {
  UpdateChannelInput,
  UpdateChannelOwnerIdInput
} from './dto/update-channel.input'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { StringValidationPipe } from '../common/pipes/string.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { NanoidsValidationPipe } from 'src/common/pipes/nanoids.pipe'
import { UsernameValidationPipe } from 'src/common/pipes/username.pipe'
import { PubSub } from 'graphql-subscriptions'

@Resolver(() => Channel)
@UseGuards(AuthorizationGuard)
export class ChannelResolver {
  constructor(
    private readonly channelService: ChannelService,
    private readonly pubSub: PubSub
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => Channel, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelEdition(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    console.log('channelEdition sub')
    return this.pubSub.asyncIterator('channelEdited-' + id)
  }

  @Subscription(() => Channel, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelDeletion(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    console.log('channelDeletion sub')
    return this.pubSub.asyncIterator('channelDeleted-' + id)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => Channel)
  async createChannel(
    @Args('data', { type: () => CreateChannelInput }, ValidationPipe)
    data: CreateChannelInput
  ): Promise<Channel> {
    return this.channelService.create(data)
  }

  @Mutation(() => Channel)
  async updateChannel(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string,
    @Args('data', { type: () => UpdateChannelInput }, ValidationPipe)
    data: UpdateChannelInput
  ): Promise<Channel> {
    return this.channelService.update(id, data)
  }

  @Mutation(() => Channel)
  async updateChannelOwner(
    id: string,
    data: UpdateChannelOwnerIdInput
  ): Promise<Channel | null> {
    return this.channelService.updateOwner(id, data)
  }

  @Mutation(() => Channel)
  async deleteChannel(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<Channel> {
    return this.channelService.delete(id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => Channel)
  findOneChannel(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<Channel | null> {
    return this.channelService.findOne(id)
  }

  @Query(() => Channel)
  findOneChannelByName(
    @Args('name', { type: () => String }, UsernameValidationPipe) name: string
  ): Promise<Channel | null> {
    return this.channelService.findOneByUsername(name)
  }

  @Query(() => [Channel])
  findChannelByChannelIds(
    @Args('channelIds', { type: () => [String] }, NanoidsValidationPipe)
    channelIds: string[]
  ): Promise<Channel[]> {
    return this.channelService.findChannelByChannelIds(channelIds)
  }

  @Query(() => [Channel])
  findAllChannelThatContain(
    @Args('needle', { type: () => String }, StringValidationPipe) needle: string
  ): Promise<Channel[]> {
    return this.channelService.findAllThatContain(needle)
  }

  @Query(() => String)
  findChannelOwner(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<string | null> {
    return this.channelService.findOwner(channelId)
  }

  @Query(() => [Channel])
  findAllChannelOfOwner(
    @Args('userId', { type: () => String }, NanoidValidationPipe) userId: string
  ): Promise<Channel[]> {
    return this.channelService.findAllChannelOfOwner(userId)
  }
}
