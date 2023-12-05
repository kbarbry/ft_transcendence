import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Context
} from '@nestjs/graphql'
import { PrivateMessageService } from './private-message.service'
import { PrivateMessage } from './entities/private-message.entity'
import { CreatePrivateMessageInput } from './dto/create-private-message.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { UpdatePrivateMessageInput } from './dto/update-private-message.input'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { StringValidationPipe } from '../common/pipes/string.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'
import {
  ExceptionPrivateMessageDoesNotExist,
  ExceptionPrivateMessageForbiddenAccess
} from '../channel/exceptions/private-message.exception'

@Resolver(() => PrivateMessage)
@UseGuards(AuthorizationGuard)
export class PrivateMessageResolver {
  constructor(
    private readonly privateMessageService: PrivateMessageService,
    private readonly pubSub: PubSub
  ) {}
  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => PrivateMessage, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  privateMessageCreation(
    @Args('senderId', { type: () => String }, NanoidValidationPipe)
    senderId: string,
    @Args('receiverId', { type: () => String }, NanoidValidationPipe)
    receiverId: string
  ) {
    const [notificationSenderId, notificationReceiverId] =
      senderId > receiverId ? [receiverId, senderId] : [senderId, receiverId]

    return this.pubSub.asyncIterator(
      'messageReceived-' + notificationSenderId + notificationReceiverId
    )
  }

  @Subscription(() => PrivateMessage, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  privateMessageEdition(
    @Args('senderId', { type: () => String }, NanoidValidationPipe)
    senderId: string,
    @Args('receiverId', { type: () => String }, NanoidValidationPipe)
    receiverId: string
  ) {
    const [notificationSenderId, notificationReceiverId] =
      senderId > receiverId ? [receiverId, senderId] : [senderId, receiverId]

    return this.pubSub.asyncIterator(
      'messageEdited-' + notificationSenderId + notificationReceiverId
    )
  }

  @Subscription(() => PrivateMessage, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  privateMessageDeletion(
    @Args('senderId', { type: () => String }, NanoidValidationPipe)
    senderId: string,
    @Args('receiverId', { type: () => String }, NanoidValidationPipe)
    receiverId: string
  ) {
    const [notificationSenderId, notificationReceiverId] =
      senderId > receiverId ? [receiverId, senderId] : [senderId, receiverId]

    return this.pubSub.asyncIterator(
      'messageDeleted-' + notificationSenderId + notificationReceiverId
    )
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => PrivateMessage)
  async createPrivateMessage(
    @Args('data', { type: () => CreatePrivateMessageInput }, ValidationPipe)
    data: CreatePrivateMessageInput,
    @Context() ctx: any
  ): Promise<PrivateMessage> {
    if (ctx?.req?.user?.id !== data.senderId)
      throw new ExceptionPrivateMessageForbiddenAccess()

    const { senderId, receiverId } = data
    const [notificationSenderId, notificationReceiverId] =
      senderId > receiverId ? [receiverId, senderId] : [senderId, receiverId]

    const res = await this.privateMessageService.create(data)

    if (res)
      await this.pubSub.publish(
        'messageReceived-' + notificationSenderId + notificationReceiverId,
        { res }
      )
    return res
  }

  @Mutation(() => PrivateMessage)
  async updatePrivateMessage(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string,
    @Args('data', { type: () => UpdatePrivateMessageInput }, ValidationPipe)
    data: UpdatePrivateMessageInput,
    @Context() ctx: any
  ): Promise<PrivateMessage> {
    const msg = await this.findOnePrivateMessage(id)
    if (!msg) throw new ExceptionPrivateMessageDoesNotExist()

    if (ctx?.req?.user?.id !== msg.senderId)
      throw new ExceptionPrivateMessageForbiddenAccess()

    const { senderId, receiverId } = msg
    const [notificationSenderId, notificationReceiverId] =
      senderId > receiverId ? [receiverId, senderId] : [senderId, receiverId]

    const res = await this.privateMessageService.update(id, data)

    if (res)
      await this.pubSub.publish(
        'messageEdited-' + notificationSenderId + notificationReceiverId,
        { res }
      )
    return res
  }

  @Mutation(() => PrivateMessage)
  async deletePrivateMessage(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string,
    @Context() ctx: any
  ): Promise<PrivateMessage> {
    const msg = await this.findOnePrivateMessage(id)
    if (!msg) throw new ExceptionPrivateMessageDoesNotExist()

    if (ctx?.req?.user?.id !== msg.senderId)
      throw new ExceptionPrivateMessageForbiddenAccess()

    const { senderId, receiverId } = msg
    const [notificationSenderId, notificationReceiverId] =
      senderId > receiverId ? [receiverId, senderId] : [senderId, receiverId]

    const res = await this.privateMessageService.delete(id)

    if (res)
      await this.pubSub.publish(
        'messageDeleted-' + notificationSenderId + notificationReceiverId,
        { res }
      )
    return res
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => PrivateMessage)
  findOnePrivateMessage(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<PrivateMessage | null> {
    return this.privateMessageService.findOne(id)
  }

  @Query(() => [PrivateMessage])
  findAllPrivateMessageWith(
    @Args('senderId', { type: () => String }, NanoidValidationPipe)
    senderId: string,
    @Args('receiverId', { type: () => String }, NanoidValidationPipe)
    receiverId: string
  ): Promise<PrivateMessage[]> {
    return this.privateMessageService.findAllMessageWith(senderId, receiverId)
  }

  @Query(() => [PrivateMessage])
  findAllPrivateMessageContain(
    @Args('senderId', { type: () => String }, NanoidValidationPipe)
    senderId: string,
    @Args('receiverId', { type: () => String }, NanoidValidationPipe)
    receiverId: string,
    @Args('needle', { type: () => String }, StringValidationPipe)
    needle: string
  ): Promise<PrivateMessage[]> {
    return this.privateMessageService.findPrivateMessageContain(
      senderId,
      receiverId,
      needle
    )
  }
}
