import { InputType, Field } from '@nestjs/graphql'
import { Matches, Length } from 'class-validator'

@InputType()
export class RelationFriendInput {
  @Field(() => String)
  @Matches(/^[0-9a-zA-Z_-]+$/, {
    message: 'Invalid nanoid characters.'
  })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  userAId: string

  @Field(() => String)
  @Matches(/^[0-9a-zA-Z_-]+$/, {
    message: 'Invalid nanoid characters.'
  })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  userBId: string
}
