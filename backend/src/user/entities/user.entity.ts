import { ObjectType, Field, Float } from '@nestjs/graphql'
import { ELanguage, EStatus } from '@prisma/client'
import { ChannelBlocked } from 'src/channel-blocked/entities/channel-blocked.entity'
import { ChannelInvited } from 'src/channel-invited/entities/channel-invited.entity'
import { ChannelMember } from 'src/channel-member/entities/channel-member.entity'
import { ChannelMessage } from 'src/channel-message/entities/channel-message.entity'
import { Channel } from 'src/channel/entities/channel.entity'
import { GameStat } from 'src/game-stat/entities/game-stat.entity'
import { PrivateMessage } from 'src/private-message/entities/private-message.entity'
import { RelationBlocked } from 'src/relation-blocked/entities/relation-blocked.entity'
import { RelationFriend } from 'src/relation-friend/entities/relation-friend.entity'
import { RelationRequests } from 'src/relation-requests/entities/relation-requests.entity'
import { UserPresence } from 'src/user-presence/entities/user-presence.entity'

@ObjectType()
export class User {
  @Field(() => String, { description: 'Id field from user' })
  id: string

  @Field(() => String)
  avatarUrl: string

  @Field(() => String)
  mail: string

  @Field(() => String)
  username: string

  @Field(() => EStatus)
  status: EStatus

  @Field(() => ELanguage)
  languages: ELanguage

  @Field(() => Float)
  level: number

  @Field(() => [UserPresence])
  userPresences: UserPresence[]

  @Field(() => [Channel])
  channelOwners: Channel[]

  @Field(() => [ChannelMember])
  channelMembers: ChannelMember[]

  @Field(() => [ChannelBlocked])
  channelBlockeds: ChannelBlocked[]

  @Field(() => [ChannelInvited])
  channelInviteds: ChannelInvited[]

  @Field(() => [ChannelMessage])
  channelMessages: ChannelMessage[]

  @Field(() => [PrivateMessage])
  userReceiver: PrivateMessage[]

  @Field(() => [PrivateMessage])
  userSender: PrivateMessage[]

  @Field(() => [RelationBlocked])
  userBlockeds: RelationBlocked[]

  @Field(() => [RelationBlocked])
  userBlocks: RelationBlocked[]

  @Field(() => [RelationFriend])
  relationFriendAs: RelationFriend[]

  @Field(() => [RelationFriend])
  relationFriendBs: RelationFriend[]

  @Field(() => [RelationRequests])
  requestReceivers: RelationRequests[]

  @Field(() => [RelationRequests])
  requestSenders: RelationRequests[]

  @Field(() => [GameStat])
  loser: GameStat[]

  @Field(() => [GameStat])
  winner: GameStat[]

  @Field(() => Date)
  createdAt: Date
}
