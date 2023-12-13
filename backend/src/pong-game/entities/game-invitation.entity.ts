import { ObjectType, Field } from '@nestjs/graphql'
import { EGameType } from '@prisma/client'

@ObjectType()
export class GameInvitation {
  @Field(() => String)
  gameId: string

  @Field(() => EGameType)
  gameType: EGameType

  @Field(() => String)
  senderNickname: string
}
