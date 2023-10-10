import { ObjectType, Field } from '@nestjs/graphql'
import { EMemberType } from 'prisma/prisma-client'

@ObjectType()
export class ChannelMember {
  @Field(() => String)
  avatarUrl: string

  @Field(() => String)
  nickname: string

  @Field(() => String)
  userId: string

  @Field(() => String)
  channelId: string

  @Field(() => EMemberType)
  type: EMemberType

  @Field(() => Boolean)
  muted: boolean

  @Field(() => Date)
  juskakan: Date

  @Field(() => Date)
  createdAt: Date
}
