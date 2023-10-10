import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ChannelBlocked {
  @Field(() => String, { description: 'userId' })
  userId: string

  @Field(() => String, { description: 'channelId' })
  channelId: string
}
