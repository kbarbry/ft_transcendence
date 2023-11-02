import { InputType } from '@nestjs/graphql'
import { CreateUserAuthInput } from './create-user-auth.input'
import { PartialType } from '@nestjs/graphql'
import { IsString, Length } from 'class-validator'
import { Field } from '@nestjs/graphql'

@InputType()
export class UpdateUserAuthInput extends PartialType(CreateUserAuthInput) {
  @Field(() => String)
  @IsString({ message: '$property must be a string.' })
  @Length(6, 30, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  password: string
}
