import { CreateUserInput } from './create-user.input'
import { InputType, PartialType, OmitType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['mail'])
) {}
