import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql'
import { CreateChannelInput } from './create-channel.input'

@InputType()
export class UpdateChannelInput extends PartialType(
  OmitType(CreateChannelInput, ['ownerId'])
) {}

@InputType()
export class UpdateChannelOwnerIdInput extends PartialType(
  PickType(CreateChannelInput, ['ownerId'])
) {}
