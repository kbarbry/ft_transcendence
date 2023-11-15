import { InputType, Field } from '@nestjs/graphql'
import { ELanguage } from '@prisma/client'
import { IsEnum, IsOptional, IsUrl, Length, IsBoolean } from 'class-validator'
import { CustomIsEmail } from 'src/common/pipes/email.pipe'
import { CustomIsPassword } from 'src/common/pipes/password.pipe'
import { CustomIsName } from 'src/common/pipes/username.pipe'

@InputType()
class CreateUserAuthInput {
  @Field(() => String)
  @CustomIsEmail({ message: '$property must be a valid email address.' })
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
  @CustomIsName()
  username: string

  @Field(() => ELanguage, { nullable: true })
  @IsOptional()
  @IsEnum(ELanguage, { message: '$property must be a valid ELanguage.' })
  languages?: ELanguage
}

@InputType()
export class CreateUserAOuth20Input extends CreateUserAuthInput {
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

@InputType()
export class CreateUserAuthLocalInput extends CreateUserAuthInput {
  @Field(() => String)
  @CustomIsPassword()
  password: string
}
