import { InputType, Field } from '@nestjs/graphql'
import { IsUUID, Length } from 'class-validator'

@InputType()
export class RelationRequestsInput {
  @Field(() => String)
  @IsUUID('4')
  @Length(21, 21)
  userSenderId: string

  @Field(() => String)
  @IsUUID('4')
  @Length(21, 21)
  userReceiverId: string
}
