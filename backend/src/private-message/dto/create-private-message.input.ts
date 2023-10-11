import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsUUID, Length } from 'class-validator'

@InputType()
export class CreatePrivateMessageInput {
  @Field(() => String)
  @IsString()
  @Length(1, 2000)
  content: string

  @Field(() => String)
  @IsUUID(4)
  @Length(21, 21)
  senderId: string

  @Field(() => String)
  @IsUUID(4)
  @Length(21, 21)
  receiverId: string
}
