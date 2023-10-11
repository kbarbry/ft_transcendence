import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsUUID, Length, MaxLength } from 'class-validator'

@InputType()
export class CreateChannelMessageInput {
  @Field(() => String)
  @IsString()
  @MaxLength(2000)
  content: string

  @Field(() => String)
  @IsUUID(4)
  @Length(21, 21)
  senderId: string

  @Field(() => String)
  @IsUUID(4)
  @Length(21, 21)
  channelId: string
}
