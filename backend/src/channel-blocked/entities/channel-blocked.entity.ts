import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ChannelBlocked {
  @Field(() => String)
  userId: string

  @Field(() => String)
  channelId: string
}
