import { InputType, Field, Float } from '@nestjs/graphql'
import { ELanguage, EStatus } from '@prisma/client'
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min
} from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl({}, { message: '$property must be a valid URL.' })
  @Length(1, 2083, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  avatarUrl?: string

  @Field(() => String)
  @IsEmail({}, { message: '$property must be a valid email address.' })
  mail: string

  @Field(() => String)
  @IsString({ message: '$property must be a string.' })
  @Length(1, 30, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  username: string

  @Field(() => EStatus, { nullable: true })
  @IsOptional()
  @IsEnum(EStatus, { message: '$property must be a valid $constraint1.' })
  status?: EStatus

  @Field(() => ELanguage, { nullable: true })
  @IsOptional()
  @IsEnum(ELanguage, { message: '$property must be a valid $constraint1.' })
  languages?: ELanguage

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: '$property must be a number.' }
  )
  @Min(0, { message: '$property must not be less than $constraint1.' })
  level?: number
}
