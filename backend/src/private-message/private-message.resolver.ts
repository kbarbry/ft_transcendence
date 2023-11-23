import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  ObjectType,
  Field
} from '@nestjs/graphql'
import { PrivateMessageService } from './private-message.service'
import { PrivateMessage } from './entities/private-message.entity'
import { CreatePrivateMessageInput } from './dto/create-private-message.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { UpdatePrivateMessageInput } from './dto/update-private-message.input'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { StringValidationPipe } from '../common/pipes/string.pipe'
import { AuthorizationGuard } from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'

@ObjectType()
export class ResTest {
  @Field(() => String)
  id: string

  @Field(() => String)
  titre: string
}

@Resolver(() => PrivateMessage)
// @UseGuards(AuthorizationGuard)
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
  privateMessageCreation() {
    console.log('Subscription Payload:')
    return this.pubSub.asyncIterator('messageReceived')
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => PrivateMessage)
  async createPrivateMessage(
    @Args('data', { type: () => CreatePrivateMessageInput }, ValidationPipe)
    data: CreatePrivateMessageInput
  ): Promise<PrivateMessage> {
    const res = await this.privateMessageService.create(data)

    await this.pubSub.publish('messageReceived', { res })
    return res
  }

  @Mutation(() => PrivateMessage)
  async updatePrivateMessage(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string,
    @Args('data', { type: () => UpdatePrivateMessageInput }, ValidationPipe)
    data: UpdatePrivateMessageInput
  ): Promise<PrivateMessage> {
    return this.privateMessageService.update(id, data)
  }

  @Mutation(() => PrivateMessage)
  async deletePrivateMessage(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<PrivateMessage> {
    return this.privateMessageService.delete(id)
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
