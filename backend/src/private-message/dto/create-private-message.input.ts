import { Field, InputType } from '@nestjs/graphql'
import { IsString, Length, Matches } from 'class-validator'

@InputType()
export class CreatePrivateMessageInput {
  @Field(() => String)
  @IsString({ message: '$property must be a string.' })
  @Length(1, 2000, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
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
  receiverId: string
}
