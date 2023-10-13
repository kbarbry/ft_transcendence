import { InputType, Field } from '@nestjs/graphql'
import { IsUUID, Length } from 'class-validator'

@InputType()
export class RelationBlockedInput {
  @Field(() => String)
  @IsUUID('4', { message: '$property must be a valid nanoid.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  userBlockingId: string

  @Field(() => String)
  @IsUUID('4', { message: '$property must be a valid nanoid.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  userBlockedId: string
}
