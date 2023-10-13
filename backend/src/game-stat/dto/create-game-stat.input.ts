import { Field, InputType, Int } from '@nestjs/graphql'
import { EGameType } from '@prisma/client'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Length
} from 'class-validator'

@InputType()
export class CreateGameStatInput {
  @Field(() => EGameType)
  @IsEnum(EGameType)
  type: EGameType

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  timePlayed: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  scoreWinner: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  scoreLoser: number

  @Field(() => String)
  @IsOptional()
  @IsUUID('4')
  @Length(21, 21)
  winnerId?: string

  @Field(() => String)
  @IsOptional()
  @IsUUID('4')
  @Length(21, 21)
  loserId?: string
}
