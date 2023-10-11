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
  @IsString()
  @Length(1, 30)
  name: string

  @Field(() => String)
  @IsOptional()
  @IsUrl()
  @Length(1, 2083)
  avatarUrl?: string

  @Field(() => String)
  @IsOptional()
  @IsString()
  @Length(1, 1024)
  topic?: string

  @Field(() => String)
  @IsOptional()
  @IsString()
  @Length(1, 30)
  password?: string

  @Field(() => String)
  @IsUUID('4', { message: 'User ID must be a valid nanoid.' })
  @Length(21, 21, { message: 'User ID must be exactly 21 characters long.' })
  ownerId: string

  @Field(() => Int)
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(1)
  @Max(50)
  maxUsers?: number

  @Field(() => EChannelType)
  @IsOptional()
  @IsEnum(EChannelType)
  type?: EChannelType
}
