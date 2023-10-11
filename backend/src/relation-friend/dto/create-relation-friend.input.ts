import { InputType, Field } from '@nestjs/graphql'
import { IsUUID, Length } from 'class-validator'

@InputType()
export class RelationFriendInput {
  @Field(() => String)
  @IsUUID('4')
  @Length(21, 21)
  userA: string

  @Field(() => String)
  @IsUUID('4')
  @Length(21, 21)
  userB: string
}
