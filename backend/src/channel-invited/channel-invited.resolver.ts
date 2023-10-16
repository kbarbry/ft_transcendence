import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { ChannelInvited } from './entities/channel-invited.entity'
import { ChannelInvitedService } from './channel-invited.service'
import { CreateChannelInvitedInput } from './dto/create-channel-invited.input'
import { ValidationPipe } from '@nestjs/common'

@Resolver(() => ChannelInvited)
export class ChannelInvitedResolver {
  constructor(private readonly channelInvitedServie: ChannelInvitedService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => ChannelInvited)
  async createChannelInvited(
    @Args('data', { type: () => CreateChannelInvitedInput }, ValidationPipe)
    createChannelInvitedDto: CreateChannelInvitedInput
  ): Promise<ChannelInvited> {
    return this.channelInvitedServie.create(createChannelInvitedDto)
  }

  @Mutation(() => ChannelInvited)
  async deleteChannelInvited(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelInvited> {
    return this.channelInvitedServie.delete(userId, channelId)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => ChannelInvited)
  async findOneChannelInvited(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelInvited | null> {
    return this.channelInvitedServie.findOne(userId, channelId)
  }

  @Query(() => [ChannelInvited])
  async findAllChannelInvitedInChannel(
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelInvited[]> {
    return this.channelInvitedServie.findAllInChannel(channelId)
  }
}
