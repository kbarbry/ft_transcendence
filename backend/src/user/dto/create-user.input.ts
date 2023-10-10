import { InputType, Field, Float } from '@nestjs/graphql'
import { EStatus } from '@prisma/client'
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength
} from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsOptional()
  @IsUrl()
  @MaxLength(2083)
  avatarUrl?: string

  @Field(() => String)
  @IsEmail()
  mail: string

  @Field(() => String)
  @IsString({ always: true })
  @MaxLength(30)
  username: string

  @Field(() => EStatus)
  @IsEnum(EStatus)
  status: EStatus

  @Field(() => Float)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  level: number
}
