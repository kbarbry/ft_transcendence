import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ChannelService } from './channel.service'
import { Channel } from './entities/channel.entity'
import { CreateChannelInput } from './dto/create-channel.input'
import { ValidationPipe } from '@nestjs/common'
import { UpdateChannelInput } from './dto/update-channel.input'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { StringValidationPipe } from '../common/pipes/string.pipe'

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

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
