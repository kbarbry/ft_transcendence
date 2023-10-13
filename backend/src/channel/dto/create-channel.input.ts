import { InputType, Field, Int } from '@nestjs/graphql'
import { EChannelType } from '@prisma/client'
import {
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  IsNumber,
  IsEnum,
  Min,
  Max
} from 'class-validator'

@InputType()
export class CreateChannelInput {
  @Field(() => String)
  @IsString({ message: '$property must be a string.' })
  @Length(1, 30, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  name: string

  @Field(() => String)
  @IsOptional()
  @IsUrl({}, { message: '$property must be a valid URL.' })
  @Length(1, 2083, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  avatarUrl?: string

  @Field(() => String)
  @IsOptional()
  @IsString({ message: '$property must be a string.' })
  @Length(1, 1024, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  topic?: string

  @Field(() => String)
  @IsOptional()
  @IsString({ message: '$property must be a string.' })
  @Length(1, 30, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  password?: string

  @Field(() => String)
  @IsUUID('4', { message: '$property must be a valid nanoid.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  ownerId: string

  @Field(() => Int)
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: '$property must be a number.' }
  )
  @Min(1, { message: '$property must not be less than $constraint1.' })
  @Max(50, { message: '$property must not be greater than $constraint1.' })
  maxUsers?: number

  @Field(() => EChannelType)
  @IsOptional()
  @IsEnum(EChannelType, { message: '$property must be a valid $constraint1.' })
  type?: EChannelType
}
