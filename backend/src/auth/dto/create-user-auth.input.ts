import { InputType, Field } from '@nestjs/graphql'
import { ELanguage } from '@prisma/client'
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsBoolean,
  Length,
  IsEmail
} from 'class-validator'

@InputType()
export class CreateUserAuthInput {
  @Field(() => String)
  @IsEmail({}, { message: '$property must be a valid email address.' })
  mail: string

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

  @Field(() => ELanguage, { nullable: true })
  @IsOptional()
  @IsEnum(ELanguage, { message: '$property must be a valid ELanguage.' })
  languages?: ELanguage

  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  googleAuth?: boolean

  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  githubAuth?: boolean

  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  school42Auth?: boolean
}
