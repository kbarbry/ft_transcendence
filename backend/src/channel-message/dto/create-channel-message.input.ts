import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsUUID, Length } from 'class-validator'

@InputType()
export class CreateChannelMessageInput {
  @Field(() => String)
  @IsString({ message: '$property must be a string.' })
  @Length(1, 2000, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  content: string

  @Field(() => String)
  @IsUUID(4, { message: '$property must be a valid nanoid.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  senderId: string

  @Field(() => String)
  @IsUUID(4, { message: '$property must be a valid nanoid.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  channelId: string
}
