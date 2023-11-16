import { Field, InputType } from '@nestjs/graphql'
import { Length, Matches } from 'class-validator'
import { CustomIsMessage } from 'src/common/pipes/message.pipe'

@InputType()
export class CreateChannelMessageInput {
  @Field(() => String)
  @CustomIsMessage({
    message: '$property must be between 1 and 2000 characters long.'
  })
  content: string

  @Field(() => String)
  @Matches(/^[0-9a-zA-Z_-]+$/, {
    message: 'Invalid nanoid characters.'
  })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  senderId: string

  @Field(() => String)
  @Matches(/^[0-9a-zA-Z_-]+$/, {
    message: 'Invalid nanoid characters.'
  })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  channelId: string
}
