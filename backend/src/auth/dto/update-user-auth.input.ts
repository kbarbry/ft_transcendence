import { InputType } from '@nestjs/graphql'
import { CreateUserAuthInput } from './create-user-auth.input'
import { PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserAuthInput extends PartialType(CreateUserAuthInput) {}
