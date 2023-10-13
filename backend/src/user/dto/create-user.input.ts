import { InputType, Field, Float } from '@nestjs/graphql'
import { ELanguage, EStatus } from '@prisma/client'
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length
} from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  @Length(1, 2083)
  avatarUrl?: string

  @Field(() => String)
  @IsEmail()
  mail: string

  @Field(() => String)
  @IsString()
  @Length(1, 30)
  username: string

  @Field(() => EStatus, { nullable: true })
  @IsOptional()
  @IsEnum(EStatus)
  status?: EStatus

  @Field(() => ELanguage, { nullable: true })
  @IsOptional()
  @IsEnum(ELanguage)
  languages?: ELanguage

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  level?: number
}
