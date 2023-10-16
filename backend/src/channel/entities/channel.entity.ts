import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { EChannelType } from '@prisma/client'

@ObjectType()
export class Channel {
  @Field(() => String, { description: 'Id field from user' })
  id: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null

  @Field(() => String, { nullable: true })
  topic?: string | null

  @Field(() => String, { nullable: true })
  password?: string | null

  @Field(() => String)
  ownerId: string

  @Field(() => Int)
  maxUsers: number

  @Field(() => EChannelType)
  type: EChannelType

  @Field(() => Date)
  createdAt: Date
}

registerEnumType(EChannelType, { name: 'EChannelType' })
