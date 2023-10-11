import { Field, InputType } from '@nestjs/graphql'
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MaxLength
} from 'class-validator'

@InputType()
export class CreateChannelMessageInput {
  @Field(() => String)
  @IsString({ always: true })
  @IsNotEmpty()
  @MaxLength(2000)
  content: string

  @Field(() => String)
  @IsUUID(4)
  @Length(21, 21)
  userId: string

  @Field(() => String)
  @IsUUID(4)
  @Length(21, 21)
  channelId: string
}
