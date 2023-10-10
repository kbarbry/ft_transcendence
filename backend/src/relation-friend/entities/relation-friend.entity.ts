import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class RelationFriend {
  @Field(() => String)
  userAId: string

  @Field(() => String)
  userBId: string
}
