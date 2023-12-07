import { Field, ObjectType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@ObjectType()
export class MatchmakingOponentInfo {
  @Field(() => Boolean)
  @IsOptional()
  state?: boolean

  @Field(() => String)
  @IsOptional()
  opponentName?: string

  @Field(() => String)
  @IsOptional()
  gameId?: string
}
