import { InputType, Field, Float } from '@nestjs/graphql'
import { ELanguage, EStatus } from '@prisma/client'
import {
  IsBoolean,
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
  @IsEmail({})
  mail: string

  @Field(() => String)
  @IsString({ always: true })
  @MaxLength(30)
  username: string

  @Field(() => String)
  @IsOptional()
  @IsString({ always: true })
  @MaxLength(30)
  password?: string

  @Field(() => String)
  @IsOptional()
  @IsString({ always: true })
  @MaxLength(255)
  googleId?: string

  @Field(() => String)
  @IsOptional()
  @IsString({ always: true })
  @MaxLength(255)
  school42Id?: string

  @Field(() => String)
  @IsOptional()
  @IsBoolean()
  doubleA?: boolean

  @Field(() => EStatus)
  @IsOptional()
  @IsEnum(EStatus)
  status?: EStatus

  @Field(() => ELanguage)
  @IsOptional()
  @IsEnum(ELanguage)
  languages?: ELanguage

  @Field(() => Float)
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  level?: number
}
