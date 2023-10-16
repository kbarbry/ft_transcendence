import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ChannelService } from './channel.service'
import { Channel } from './entities/channel.entity'
import { CreateChannelInput } from './dto/create-channel.input'
import { ValidationPipe } from '@nestjs/common'
import { UpdateChannelInput } from './dto/update-channel.input'

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => Channel)
  async createChannel(
    @Args('data', { type: () => CreateChannelInput }, ValidationPipe)
    createChannelDto: CreateChannelInput
  ): Promise<Channel> {
    return this.channelService.create(createChannelDto)
  }

  @Mutation(() => Channel)
  async updateChannel(
    @Args('id', { type: () => String }) id: string,
    @Args('data', { type: () => UpdateChannelInput }, ValidationPipe)
    data: UpdateChannelInput
  ): Promise<Channel> {
    return this.channelService.update(id, data)
  }

  @Mutation(() => Channel)
  async deleteChannel(
    @Args('id', { type: () => String }) id: string
  ): Promise<Channel> {
    return this.channelService.delete(id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => Channel)
  findOneChannel(
    @Args('id', { type: () => String }) id: string
  ): Promise<Channel | null> {
    return this.channelService.findOne(id)
  }

  @Query(() => [Channel])
  findAllChannelThatContain(
    @Args('str', { type: () => String }) str: string
  ): Promise<Channel[]> {
    return this.channelService.findAllThatContain(str)
  }

  @Query(() => [Channel])
  findChannelOwner(
    @Args('channelId', { type: () => String }) channelId: string
  ): Promise<string | null> {
    return this.channelService.findOwner(channelId)
  }

  @Query(() => [Channel])
  findAllChannelOfOwner(
    @Args('userId', { type: () => String }) userId: string
  ): Promise<Channel[]> {
    return this.channelService.findAllChannelOfOwner(userId)
  }
}
