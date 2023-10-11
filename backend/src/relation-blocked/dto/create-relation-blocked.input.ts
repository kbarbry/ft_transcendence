import { InputType, Field } from '@nestjs/graphql'
import { IsUUID, Length } from 'class-validator'

@InputType()
export class RelationBlockedInput {
  @Field(() => String)
  @IsUUID('4')
  @Length(21, 21)
  userBlockingId: string

  @Field(() => String)
  @IsUUID('4')
  @Length(21, 21)
  userBlockedId: string
}
