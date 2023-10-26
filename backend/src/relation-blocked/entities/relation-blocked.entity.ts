import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class RelationBlocked {
  @Field(() => String)
  userBlockingId: string

  @Field(() => String)
  userBlockedId: string
}
