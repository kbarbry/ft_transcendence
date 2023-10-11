import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString, IsUrl, IsUUID, Length } from 'class-validator'

@InputType()
export class CreateChannelMemberCreateInput {
  @Field(() => String)
  @IsOptional()
  @IsUrl()
  @Length(1, 2083)
  avatarUrl?: string

  @Field(() => String)
  @IsString()
  @Length(1, 30)
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
