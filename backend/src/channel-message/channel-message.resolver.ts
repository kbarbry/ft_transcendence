import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Context
} from '@nestjs/graphql'
import { ChannelMessageService } from './channel-message.service'
import { ChannelMessage } from './entities/channel-message.entity'
import { CreateChannelMessageInput } from './dto/create-channel-message.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { UpdateChannelMessageInput } from './dto/update-channel-message.input'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { StringValidationPipe } from '../common/pipes/string.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'
import { ExceptionChannelMessageDoesNotExist } from 'src/channel/exceptions/channel-message.exception'
import {
  ForbiddenAccessData,
  userContextGuard
} from 'src/auth/guards/request.guards'

@Resolver(() => ChannelMessage)
@UseGuards(AuthorizationGuard)
export class ChannelMessageResolver {
  constructor(
    private readonly channelMessageService: ChannelMessageService,
    private readonly pubSub: PubSub
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => ChannelMessage, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelMessageCreation(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ) {
    return this.pubSub.asyncIterator('messageReceived-' + channelId)
  }

  @Subscription(() => ChannelMessage, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelMessageEdition(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ) {
    return this.pubSub.asyncIterator('messageEdited-' + channelId)
  }

  @Subscription(() => ChannelMessage, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelMessageDeletion(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ) {
    return this.pubSub.asyncIterator('messageDeleted-' + channelId)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => ChannelMessage)
  async createChannelMessage(
    @Args('data', { type: () => CreateChannelMessageInput }, ValidationPipe)
    data: CreateChannelMessageInput,
    @Context() ctx: any
  ): Promise<ChannelMessage> {
    if (!userContextGuard(ctx?.req?.user?.id, data.senderId))
      throw new ForbiddenAccessData()

    const res = await this.channelMessageService.create(data)

    await this.pubSub.publish('messageReceived-' + data.channelId, { res })
    return res
  }

  @Mutation(() => ChannelMessage)
  async updateChannelMessage(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string,
    @Args('data', { type: () => UpdateChannelMessageInput }, ValidationPipe)
    data: UpdateChannelMessageInput,
    @Context() ctx: any
  ): Promise<ChannelMessage> {
    const msg = await this.findOneChannelMessage(id)
    if (!msg) throw new ExceptionChannelMessageDoesNotExist()

    if (!userContextGuard(ctx?.req?.user?.id, msg.senderId))
      throw new ForbiddenAccessData()

    const res = await this.channelMessageService.update(id, data)

    await this.pubSub.publish('messageEdited-' + msg.channelId, { res })
    return res
  }

  @Mutation(() => ChannelMessage)
  async deleteChannelMessage(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string,
    @Context() ctx: any
  ): Promise<ChannelMessage> {
    const msg = await this.findOneChannelMessage(id)
    if (!msg) throw new ExceptionChannelMessageDoesNotExist()

    if (!userContextGuard(ctx?.req?.user?.id, msg.senderId))
      throw new ForbiddenAccessData()

    const res = await this.channelMessageService.delete(id)

    await this.pubSub.publish('messageDeleted-' + msg.channelId, { res })
    return res
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => ChannelMessage)
  findOneChannelMessage(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<ChannelMessage | null> {
    return this.channelMessageService.findOne(id)
  }

  @Query(() => [ChannelMessage])
  findAllChannelMessageInChannel(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<ChannelMessage[]> {
    return this.channelMessageService.findAllInChannel(channelId)
  }

  @Query(() => [ChannelMessage])
  findAllChannelMessageInChannelByUser(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Args('senderId', { type: () => String }, NanoidValidationPipe)
    senderId: string
  ): Promise<ChannelMessage[]> {
    return this.channelMessageService.findAllInChannelByUser(
      channelId,
      senderId
    )
  }

  @Query(() => [ChannelMessage])
  findAllChannelMessageThatContain(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string,
    @Args('needle', { type: () => String }, StringValidationPipe)
    needle: string
  ): Promise<ChannelMessage[]> {
    return this.channelMessageService.findAllThatContain(channelId, needle)
  }
}
