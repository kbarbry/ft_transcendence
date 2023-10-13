import { InputType, Field } from '@nestjs/graphql'
import { IsUUID, Length } from 'class-validator'

@InputType()
export class CreateChannelInvitedInput {
  @Field(() => String)
  @IsUUID('4', { message: '$property must be a valid nanoid.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  userId: string

  @Field(() => String)
  @IsUUID('4', { message: '$property must be a valid nanoid.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  channelId: string
}
