import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ChannelMessage {
  @Field(() => String)
  id: string

  @Field(() => String)
  senderId: string

  @Field(() => String)
  channelId: string

  @Field(() => String)
  content: string

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Date)
  createdAt: Date
}
