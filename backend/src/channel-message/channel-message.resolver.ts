import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ChannelMessageService } from './channel-message.service'
import { ChannelMessage } from './entities/channel-message.entity'
import { CreateChannelMessageInput } from './dto/create-channel-message.input'
import { ValidationPipe } from '@nestjs/common'
import { UpdateChannelMessageInput } from './dto/update-channel-message.input'

@Resolver(() => ChannelMessage)
export class ChannelMessageResolver {
  constructor(private readonly channelMessageService: ChannelMessageService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => ChannelMessage)
  async createChannelMessage(
    @Args('data', { type: () => CreateChannelMessageInput }, ValidationPipe)
    createChannelMessageDto: CreateChannelMessageInput
  ): Promise<ChannelMessage> {
    return this.channelMessageService.create(createChannelMessageDto)
  }

  @Mutation(() => ChannelMessage)
  async updateChannelMessage(
    @Args('id', { type: () => String }) id: string,
    @Args('data', { type: () => UpdateChannelMessageInput }, ValidationPipe)
    data: UpdateChannelMessageInput
  ): Promise<ChannelMessage> {
    return this.channelMessageService.update(id, data)
  }

  @Mutation(() => ChannelMessage)
  async deleteChannelMessage(
    @Args('id', { type: () => String }) id: string
  ): Promise<ChannelMessage> {
    return this.channelMessageService.delete(id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => ChannelMessage)
  findOneChannelMessage(
    @Args('id', { type: () => String }) id: string
  ): Promise<ChannelMessage | null> {
    return this.channelMessageService.findOne(id)
  }

  @Query(() => [ChannelMessage])
  findAllChannelMessageInChannel(
    @Args('channelId', { type: () => String }) channelId: string
  ): Promise<ChannelMessage[]> {
    return this.channelMessageService.findAllInChannel(channelId)
  }

  @Query(() => [ChannelMessage])
  findAllChannelMessageInChannelByUser(
    @Args('channelId', { type: () => String }) channelId: string,
    @Args('senderId', { type: () => String }) senderId: string
  ): Promise<ChannelMessage[]> {
    return this.channelMessageService.findAllInChannelByUser(
      channelId,
      senderId
    )
  }

  @Query(() => [ChannelMessage])
  findAllChannelMessageThatContain(
    @Args('channelId', { type: () => String }) channelId: string,
    @Args('containingText', { type: () => String }) containingText: string
  ): Promise<ChannelMessage[]> {
    return this.channelMessageService.findAllInChannelByUser(
      channelId,
      containingText
    )
  }
}
