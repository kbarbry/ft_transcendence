import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PrivateMessageService } from './private-message.service'
import { PrivateMessage } from './entities/private-message.entity'
import { CreatePrivateMessageInput } from './dto/create-private-message.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { UpdatePrivateMessageInput } from './dto/update-private-message.input'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { StringValidationPipe } from '../common/pipes/string.pipe'
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard'

@Resolver(() => PrivateMessage)
@UseGuards(AuthorizationGuard)
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
  findAllPrivateMessageWithLiteVersion(
    @Args('senderId', { type: () => String }, NanoidValidationPipe)
    senderId: string,
    @Args('receiverId', { type: () => String }, NanoidValidationPipe)
    receiverId: string
  ): Promise<PrivateMessage[]> {
    return this.privateMessageService.findAllMessageWithLiteVersion(
      senderId,
      receiverId
    )
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
