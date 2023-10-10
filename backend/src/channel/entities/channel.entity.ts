import { ObjectType, Field, Int } from '@nestjs/graphql'
import { EChannelType } from '@prisma/client'
import { ChannelInvited } from 'src/channel-invited/entities/channel-invited.entity'
import { ChannelMessage } from 'src/channel-message/entities/channel-message.entity'
import { ChannelMember } from 'src/channel-member/entities/channel-member.entity'
import { ChannelBlocked } from 'src/channel-blocked/entities/channel-blocked.entity'

@ObjectType()
export class Channel {
  @Field(() => String, { description: 'Id field from user' })
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  avatarUrl: string

  @Field(() => String)
  topic: string

  @Field(() => String)
  password: string

  @Field(() => String)
  ownerId: string

  @Field(() => Int)
  maxUsers: number

  @Field(() => EChannelType)
  type: EChannelType

  @Field(() => [ChannelMember])
  members: ChannelMember[]

  @Field(() => [ChannelBlocked])
  blockedUser: ChannelBlocked[]

  @Field(() => [ChannelInvited])
  invitedUser: ChannelInvited[]

  @Field(() => [ChannelMessage])
  messages: ChannelMessage[]

  @Field(() => Date)
  createdAt: Date
}

//   id          String          @id @default(nanoid())
//   name        String          @unique
//   avatarUrl   String?
//   topic       String?
//   password    String?

//   ownerId     String
//   owner       User            @relation(fields: [ownerId], references: [id])

//   maxUsers    Int             @default(50)
//   type        EChannelType    @default(Public)

//   members     ChannelMember[]
//   blockedUser ChannelBlocked[]
//   invitedUser ChannelInvited[]
//   messages    ChannelMessage[]

//   createdAt   DateTime        @default(now())
