import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ChannelInvited {
  @Field(() => String)
  userId: string

  @Field(() => String)
  channelId: string
}
