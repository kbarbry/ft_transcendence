import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class RelationRequests {
  @Field(() => String)
  userSenderId: string

  @Field(() => String)
  userReceiverId: string
}
