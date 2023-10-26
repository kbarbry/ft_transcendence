import { InputType, OmitType, PartialType } from '@nestjs/graphql'
import { CreatePrivateMessageInput } from './create-private-message.input'

@InputType()
export class UpdatePrivateMessageInput extends PartialType(
  OmitType(CreatePrivateMessageInput, ['senderId', 'receiverId'])
) {}
