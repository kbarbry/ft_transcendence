import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { ChannelMember } from './entities/channel-member.entity'
import { ChannelMemberService } from './channel-member.service'
import { CreateChannelMemberInput } from './dto/create-channel-member.input'
import { UpdateChannelMemberInput } from './dto/update-channel-member.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'

@Resolver(() => ChannelMember)
@UseGuards(AuthorizationGuard)
export class ChannelMemberResolver {
  constructor(
    private readonly channelMemberService: ChannelMemberService,
    private readonly pubSub: PubSub
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => ChannelMember, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelMemberCreation(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    console.log('channelMemberCreation sub')
    return this.pubSub.asyncIterator('memberReceived-' + id)
  }

  @Subscription(() => ChannelMember, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelMemberEdition(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    console.log('channelMemberEdition sub')
    return this.pubSub.asyncIterator('memberEdited-' + id)
  }

  @Subscription(() => ChannelMember, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelMemberDeletion(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    console.log('channelMemberDeletion sub')
    return this.pubSub.asyncIterator('memberDeleted-' + id)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => ChannelMember)
  async createChannelMember(
    @Args('data', { type: () => CreateChannelMemberInput }, ValidationPipe)
    data: CreateChannelMemberInput
  ): Promise<ChannelMember> {
    const res = await this.channelMemberService.create(data)

    const channelMembers = await this.findAllChannelMemberInChannel(
      data.channelId
    )
    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('memberReceived-' + value.userId, { res })
      })
    )
    await this.pubSub.publish('memberReceived-' + data.channelId, { res })
    return res
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
    const res = await this.channelMemberService.update(userId, channelId, data)

    await this.pubSub.publish('memberReceived-' + channelId, { res })
    return res
  }

  @Mutation(() => ChannelMember)
  async deleteChannelMember(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember> {
    const res = await this.channelMemberService.delete(userId, channelId)

    await this.pubSub.publish('memberReceived-' + channelId, { res })
    return res
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
  async findAllChannelMemberOfUser(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string
  ): Promise<ChannelMember[]> {
    return this.channelMemberService.findAllChannelMemberofUser(userId)
  }

  @Query(() => [ChannelMember])
  async findAllChannelMemberInChannel(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMember[]> {
    return this.channelMemberService.findAllInChannel(channelId)
  }
}
