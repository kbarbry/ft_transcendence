import { Field, InputType } from '@nestjs/graphql'
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  IsUUID,
  Length
} from 'class-validator'
import { CreateChannelMemberCreateInput } from './create-channel-member.input'
import { PartialType } from '@nestjs/graphql'

@InputType()
export class CreateChannelMemberUpdateInput extends PartialType(
  CreateChannelMemberCreateInput
) {}
