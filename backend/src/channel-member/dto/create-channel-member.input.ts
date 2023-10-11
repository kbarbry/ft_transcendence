import { Field, InputType } from '@nestjs/graphql'
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  IsUUID,
  Length
} from 'class-validator'

@InputType()
export class CreateChannelMemberCreateInput {
  @Field(() => String)
  @IsOptional()
  @IsUrl()
  @MaxLength(2083)
  avatarUrl: string

  @Field(() => String)
  @IsString({ always: true })
  @MaxLength(30)
  nickname: string

  @Field(() => String)
  @IsUUID('4', { message: 'User ID must be a valid nanoid.' })
  @Length(21, 21, { message: 'User ID must be exactly 21 characters long.' })
  userId: string

  @Field(() => String)
  @IsUUID('4', { message: 'User ID must be a valid nanoid.' })
  @Length(21, 21, { message: 'User ID must be exactly 21 characters long.' })
  channelId: string
}
