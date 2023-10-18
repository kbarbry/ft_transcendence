import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ChannelMember } from './entities/channel-member.entity'
import { ChannelMemberService } from './channel-member.service'
import { CreateChannelMemberCreateInput } from './dto/create-channel-member.input'
import { UpdateChannelMemberCreateInput } from './dto/update-channel-member.input'
import { ValidationPipe } from '@nestjs/common'

@Resolver(() => ChannelMember)
export class ChannelMemberResolver {
  constructor(private readonly channelMemberService: ChannelMemberService) {}

  @Mutation(() => ChannelMember)
  async createChannelMember(
    @Args(
      'data',
      { type: () => CreateChannelMemberCreateInput },
      ValidationPipe
    )
    data: CreateChannelMemberCreateInput
  ): Promise<ChannelMember> {
    return this.channelMemberService.create(data)
  }

  @Mutation(() => ChannelMember)
  async updateChannelMember(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string,
    @Args(
      'data',
      { type: () => UpdateChannelMemberCreateInput },
      ValidationPipe
    )
    data: UpdateChannelMemberCreateInput
  ): Promise<ChannelMember> {
    return this.channelMemberService.update(userId, channelId, data)
  }

  @Mutation(() => ChannelMember)
  async deleteChannelMember(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.delete(userId, channelId)
  }

  @Query(() => ChannelMember)
  async unmakeAdminChannelMember(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.unmakeAdmin(userId, channelId)
  }

  @Query(() => ChannelMember)
  async makeAdminChannelMember(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.makeAdmin(userId, channelId)
  }

  @Query(() => ChannelMember)
  async muteChannelMember(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.mute(userId, channelId)
  }

  @Query(() => ChannelMember)
  async unmuteChannelMember(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.unmute(userId, channelId)
  }

  @Query(() => ChannelMember)
  async findOneChannelMember(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember | null> {
    return this.channelMemberService.findOne(userId, channelId)
  }

  @Query(() => [ChannelMember])
  async findAllChannelMemberInChannel(
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember[]> {
    return this.channelMemberService.findAllInChannel(channelId)
  }
}
