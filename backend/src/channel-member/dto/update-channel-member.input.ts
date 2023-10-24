import { InputType, OmitType } from '@nestjs/graphql'
import { CreateChannelMemberInput } from './create-channel-member.input'
import { PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateChannelMemberInput extends PartialType(
  OmitType(CreateChannelMemberInput, ['userId', 'channelId'])
) {}
