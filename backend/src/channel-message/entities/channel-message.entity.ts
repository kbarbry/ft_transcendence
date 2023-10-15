import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ChannelMessage {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String)
  senderId: string

  @Field(() => String)
  channelId: string

  @Field(() => String)
  content: string

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null

  @Field(() => Date, { nullable: true })
  createdAt?: Date
}
