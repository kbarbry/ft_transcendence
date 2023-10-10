import { ObjectType, Field, Int } from '@nestjs/graphql'
import { EGameType } from '@prisma/client'

@ObjectType()
export class GameStat {
  @Field(() => String)
  id: string

  @Field(() => String)
  winnerId: string

  @Field(() => String)
  loserId: string

  @Field(() => EGameType)
  type: EGameType

  @Field(() => Int)
  timePlayed: number

  @Field(() => Int)
  scoreWinner: number

  @Field(() => Int)
  scoreLoser: number

  @Field(() => Date)
  createdAt: Date
}
