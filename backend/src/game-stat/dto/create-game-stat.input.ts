import { Field, InputType, Int } from '@nestjs/graphql'
import { EGameType } from '@prisma/client'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
  Length,
  Min
} from 'class-validator'

@InputType()
export class CreateGameStatInput {
  @Field(() => EGameType)
  @IsEnum(EGameType, { message: '$property must be a valid $constraint1.' })
  type: EGameType

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: '$property must be a number.' }
  )
  @Min(0, { message: '$property must not be less than $constraint1.' })
  timePlayed: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: '$property must be a number.' }
  )
  @Min(0, { message: '$property must not be less than $constraint1.' })
  scoreWinner: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: '$property must be a number.' }
  )
  @Min(0, { message: '$property must not be less than $constraint1.' })
  scoreLoser: number

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Matches(/^[0-9a-zA-Z_-]+$/, {
    message: 'Invalid nanoid characters.'
  })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  winnerId?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Matches(/^[0-9a-zA-Z_-]+$/, {
    message: 'Invalid nanoid characters.'
  })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  loserId?: string
}
