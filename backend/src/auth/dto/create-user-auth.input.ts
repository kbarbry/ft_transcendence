import { InputType, Field } from '@nestjs/graphql'
import { ELanguage } from '@prisma/client'
import { IsEnum, IsOptional, IsUrl, Length, IsBoolean } from 'class-validator'
import { CustomIsEmail } from 'src/common/pipes/email.pipe'
import { CustomIsPassword } from 'src/common/pipes/password.pipe'
import { CustomIsName } from 'src/common/pipes/username.pipe'

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
  @CustomIsName({
    message:
      '$property must be between $constraint1 and $constraint2 characters long and must only contain letters, number and single spaces.'
  })
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
  @IsBoolean({ message: '$property must be a boolean.' })
  googleAuth?: boolean

  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean({ message: '$property must be a boolean.' })
  githubAuth?: boolean

  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean({ message: '$property must be a boolean.' })
  school42Auth?: boolean
}

@InputType()
export class CreateUserAuthLocalInput extends CreateUserAuthInput {
  @Field(() => String)
  @CustomIsPassword({
    message:
      "$property must be between 8 and 50 characters and contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (all special characters aren't authorized.)"
  })
  password: string
}
