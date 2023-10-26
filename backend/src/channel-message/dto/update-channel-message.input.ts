import { InputType, OmitType, PartialType } from '@nestjs/graphql'
import { CreateChannelMessageInput } from './create-channel-message.input'

@InputType()
export class UpdateChannelMessageInput extends PartialType(
  OmitType(CreateChannelMessageInput, ['senderId', 'channelId'])
) {}
