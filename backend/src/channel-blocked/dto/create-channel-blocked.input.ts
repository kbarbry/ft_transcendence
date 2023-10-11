import { InputType, Field } from '@nestjs/graphql'
import { IsUUID, Length } from 'class-validator'

@InputType()
export class CreateChannelBlockedInput {
  @Field(() => String)
  @IsUUID('4')
  @Length(21, 21)
  userId: string

  @Field(() => String)
  @IsUUID('4')
  @Length(21, 21)
  channelId: string
}
