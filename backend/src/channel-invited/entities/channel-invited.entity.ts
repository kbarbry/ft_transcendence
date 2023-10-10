import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ChannelInvited {
  @Field(() => String, { description: 'userId' })
  userId: string

  @Field(() => String, { description: 'channelId' })
  channelId: string
}
