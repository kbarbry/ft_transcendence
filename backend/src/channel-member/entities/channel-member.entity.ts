import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { EMemberType } from '@prisma/client'

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
  memeberType: EMemberType

  @Field(() => Boolean)
  muted: boolean

  @Field(() => Date)
  createdAt: Date
}

registerEnumType(EMemberType, { name: 'EMemberType' })
