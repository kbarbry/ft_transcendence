import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class UserPresence {
  @Field(() => String)
  id: string

  @Field(() => String)
  userId: string

  @Field(() => Date)
  connectedAt: Date

  @Field(() => Date)
  disconnectedAt: Date
}
