import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PrivateMessageService } from './private-message.service'
import { PrivateMessage } from './entities/private-message.entity'
import { CreatePrivateMessageInput } from './dto/create-private-message.input'
import { ValidationPipe } from '@nestjs/common'
import { UpdatePrivateMessageInput } from './dto/update-private-message.input'

@Resolver(() => PrivateMessage)
export class PrivateMessageResolver {
  constructor(private readonly privateMessageService: PrivateMessageService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => PrivateMessage)
  async createPrivateMessage(
    @Args('data', { type: () => CreatePrivateMessageInput }, ValidationPipe)
    data: CreatePrivateMessageInput
  ): Promise<PrivateMessage> {
    return this.privateMessageService.create(data)
  }

  @Mutation(() => PrivateMessage)
  async updatePrivateMessage(
    @Args('id', { type: () => String })
    id: string,
    @Args('data', { type: () => UpdatePrivateMessageInput }, ValidationPipe)
    data: UpdatePrivateMessageInput
  ): Promise<PrivateMessage> {
    return this.privateMessageService.update(id, data)
  }

  @Mutation(() => PrivateMessage)
  async deletePrivateMessage(
    @Args('id', { type: () => String }) id: string
  ): Promise<PrivateMessage> {
    return this.privateMessageService.delete(id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => PrivateMessage)
  findOnePrivateMessage(
    @Args('id', { type: () => String }) id: string
  ): Promise<PrivateMessage | null> {
    return this.privateMessageService.findOne(id)
  }

  @Query(() => [PrivateMessage])
  findAllPrivateMessageWith(
    @Args('senderId', { type: () => String }) senderId: string,
    @Args('receiverId', { type: () => String }) receiverId: string
  ): Promise<PrivateMessage[]> {
    return this.privateMessageService.findAllMessageWith(senderId, receiverId)
  }

  @Query(() => [PrivateMessage])
  findAllPrivateMessageWithLiteVersion(
    @Args('senderId', { type: () => String }) senderId: string,
    @Args('receiverId', { type: () => String }) receiverId: string
  ): Promise<PrivateMessage[]> {
    return this.privateMessageService.findAllMessageWithLiteVersion(
      senderId,
      receiverId
    )
  }

  @Query(() => [PrivateMessage])
  findPrivateMessageContain(
    @Args('senderId', { type: () => String }) senderId: string,
    @Args('receiverId', { type: () => String }) receiverId: string,
    @Args('needle', { type: () => String }) needle: string
  ): Promise<PrivateMessage[]> {
    return this.privateMessageService.findPrivateMessageContain(
      senderId,
      receiverId,
      needle
    )
  }
}
