import { InputType, Field, Float } from '@nestjs/graphql'
import { ELanguage, EStatus } from '@prisma/client'
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min
} from 'class-validator'

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl({}, { message: '$property must be a valid URL.' })
  @Length(1, 2083, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  avatarUrl?: string

  @Field(() => String)
  @IsString({ message: '$property must be a string.' })
  @Length(1, 30, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  username: string

  @Field(() => EStatus, { nullable: true })
  @IsOptional()
  @IsEnum(EStatus, { message: '$property must be a valid EStatus.' })
  status?: EStatus

  @Field(() => ELanguage, { nullable: true })
  @IsOptional()
  @IsEnum(ELanguage, { message: '$property must be a valid ELanguage.' })
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
