import { InputType, Field } from '@nestjs/graphql'
import { Length, Matches } from 'class-validator'

@InputType()
export class UserPresenceCreateInput {
  @Field(() => String)
  @Matches(/^[0-9a-zA-Z_-]+$/, { message: 'Invalid nanoid characters.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  userId: string
}
