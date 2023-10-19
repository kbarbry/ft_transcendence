import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateChannelBlockedInput } from './dto/create-channel-blocked.input'
import { ChannelBlocked } from './entities/channel-blocked.entity'
import { ValidationPipe } from '@nestjs/common'
import { ChannelBlockedService } from './channel-blocked.service'
import { NanoidValidationPipe } from 'src/common/pipes/nanoid.pipe'

@Resolver()
export class ChannelBlockedResolver {
  constructor(private readonly channelBlockedService: ChannelBlockedService) {}

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
  async findAllInChannelBlocked(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelBlocked[]> {
    return this.channelBlockedService.findAllInChannel(channelId)
  }
}
