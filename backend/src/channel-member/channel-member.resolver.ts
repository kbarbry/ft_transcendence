import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ChannelMember } from './entities/channel-member.entity'
import { ChannelMemberService } from './channel-member.service'
import { CreateChannelMemberInput } from './dto/create-channel-member.input'
import { UpdateChannelMemberInput } from './dto/update-channel-member.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { AuthorizationGuard } from '../auth/guards/authorization.guard'

@Resolver(() => ChannelMember)
@UseGuards(AuthorizationGuard)
export class ChannelMemberResolver {
  constructor(private readonly channelMemberService: ChannelMemberService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => ChannelMember)
  async createChannelMember(
    @Args('data', { type: () => CreateChannelMemberInput }, ValidationPipe)
    data: CreateChannelMemberInput
  ): Promise<ChannelMember> {
    return this.channelMemberService.create(data)
  }

  @Mutation(() => ChannelMember)
  async updateChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Args('data', { type: () => UpdateChannelMemberInput }, ValidationPipe)
    data: UpdateChannelMemberInput
  ): Promise<ChannelMember> {
    return this.channelMemberService.update(userId, channelId, data)
  }

  @Mutation(() => ChannelMember)
  async deleteChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.delete(userId, channelId)
  }

  @Mutation(() => ChannelMember)
  async unmakeChannelMemberAdmin(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.unmakeAdmin(userId, channelId)
  }

  @Mutation(() => ChannelMember)
  async makeChannelMemberAdmin(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.makeAdmin(userId, channelId)
  }

  @Mutation(() => ChannelMember)
  async muteChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.mute(userId, channelId)
  }

  @Mutation(() => ChannelMember)
  async unmuteChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember> {
    return this.channelMemberService.unmute(userId, channelId)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => ChannelMember)
  async findOneChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember | null> {
    return this.channelMemberService.findOne(userId, channelId)
  }

  @Query(() => [ChannelMember])
  async findAllChannelMemberInChannel(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember[]> {
    return this.channelMemberService.findAllInChannel(channelId)
  }
}
