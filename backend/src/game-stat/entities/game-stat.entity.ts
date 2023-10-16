import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql'
import { EGameType } from '@prisma/client'

@ObjectType()
export class GameStat {
  @Field(() => String)
  id: string

  @Field(() => String, { nullable: true })
  winnerId?: string | null

  @Field(() => String, { nullable: true })
  loserId?: string | null

  @Field(() => EGameType)
  type?: EGameType

  @Field(() => Int)
  timePlayed: number

  @Field(() => Int)
  scoreWinner: number

  @Field(() => Int)
  scoreLoser: number

  @Field(() => Date)
  createdAt: Date
}

registerEnumType(EGameType, { name: 'EGameType' })
