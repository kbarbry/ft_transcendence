import { InputType, Field } from '@nestjs/graphql'
import { IsUUID, Length } from 'class-validator'

@InputType()
export class UserPresenceCreateInput {
  @Field(() => String)
  @IsUUID('4', { message: 'User ID must be a valid nanoid.' })
  @Length(21, 21, { message: 'User ID must be exactly 21 characters long.' })
  userId: string
}
