import { InputType, OmitType } from '@nestjs/graphql'
import { CreateChannelMemberCreateInput } from './create-channel-member.input'
import { PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateChannelMemberCreateInput extends PartialType(
  OmitType(CreateChannelMemberCreateInput, ['userId', 'channelId'])
) {}
