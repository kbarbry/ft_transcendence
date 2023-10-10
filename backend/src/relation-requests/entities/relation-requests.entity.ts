import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class RelationRequests {
  @Field(() => String, { description: 'userSenderId' })
  userSenderId: string

  @Field(() => String, { description: 'userReceiverId' })
  userReceiverId: string
}
