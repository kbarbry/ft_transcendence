import { InputType, Field, Int } from '@nestjs/graphql'
import { EChannelType } from '@prisma/client'
import {
  IsOptional,
  IsUrl,
  Length,
  IsNumber,
  IsEnum,
  Min,
  Max,
  Matches
} from 'class-validator'
import { CustomIsPassword } from '../../common/pipes/password.pipe'
import { CustomIsName } from '../../common/pipes/username.pipe'
import { CustomIsTopic } from '../../common/pipes/topic.pipe'

@InputType()
export class CreateChannelInput {
  @Field(() => String)
  @CustomIsName({
    message:
      '$property must be between $constraint1 and $constraint2 characters long and must only contain letters, number and single spaces.'
  })
  name: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl({}, { message: '$property must be a valid URL.' })
  @Length(1, 2083, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  avatarUrl?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @CustomIsTopic({
    message: '$property must be between 1 and 1024 characters long.'
  })
  topic?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @CustomIsPassword({
    message:
      "$property must be between 8 and 50 characters and contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (all special characters aren't authorized.)"
  })
  password?: string

  @Field(() => String)
  @Matches(/^[0-9a-zA-Z_-]+$/, {
    message: 'Invalid nanoid characters.'
  })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  ownerId: string

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false },
    { message: '$property must be an integer number.' }
  )
  @Min(1, { message: '$property must not be less than $constraint1.' })
  @Max(50, { message: '$property must not be greater than $constraint1.' })
  maxUsers?: number

  @Field(() => EChannelType, { nullable: true })
  @IsOptional()
  @IsEnum(EChannelType, { message: '$property must be Public or Protected' })
  type?: EChannelType
}
