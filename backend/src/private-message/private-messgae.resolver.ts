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
    createPrivateMessageDto: CreatePrivateMessageInput
  ): Promise<PrivateMessage> {
    return this.privateMessageService.create(createPrivateMessageDto)
  }

  @Mutation(() => PrivateMessage)
  async updatePrivateMessage(
    @Args('id', { type: () => String }) id: string,
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
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.privateMessageService.findOne(id)
  }

  @Query(() => [PrivateMessage])
  findAllMessageWith(
    @Args('idSender', { type: () => String }) idSender: string,
    @Args('idReceiv', { type: () => String }) idReceiv: string
  ) {
    return this.privateMessageService.findAllMessageWith(idSender, idReceiv)
  }

  @Query(() => [PrivateMessage])
  findAllMessageWithLiteVersion(
    @Args('idSender', { type: () => String }) idSender: string,
    @Args('idReceiv', { type: () => String }) idReceiv: string
  ) {
    return this.privateMessageService.findAllMessageWithLiteVersion(
      idSender,
      idReceiv
    )
  }

  @Query(() => [PrivateMessage])
  findPrivateMessageContain(
    @Args('idSender', { type: () => String }) idSender: string,
    @Args('idReceiv', { type: () => String }) idReceiv: string,
    @Args('needle', { type: () => String }) needle: string
  ) {
    return this.privateMessageService.findPrivateMessageContain(
      idSender,
      idReceiv,
      needle
    )
  }
}
