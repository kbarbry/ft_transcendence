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
  async create(
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
  async update(
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
  async delete(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.delete(userId, channelId)
  }

  @Query(() => ChannelMember)
  async unmakeAdmin(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.unmakeAdmin(userId, channelId)
  }

  @Query(() => ChannelMember)
  async makeAdmin(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.makeAdmin(userId, channelId)
  }

  @Query(() => ChannelMember)
  async mute(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.mute(userId, channelId)
  }

  @Query(() => ChannelMember)
  async unmute(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.unmute(userId, channelId)
  }

  @Query(() => ChannelMember)
  async findOne(
    @Args('userId', { type: () => String })
    userId: string,
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember | null> {
    return this.channelMemberService.findOne(userId, channelId)
  }

  @Query(() => [ChannelMember])
  async findAllInChannel(
    @Args('channelId', { type: () => String })
    channelId: string
  ): Promise<ChannelMember[]> {
    return this.channelMemberService.findAllInChannel(channelId)
  }
}
