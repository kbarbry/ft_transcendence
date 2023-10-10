import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class PrivateMessage {
  @Field(() => String, { description: 'Id Private Message' })
  id: string

  @Field(() => String)
  senderId: string

  @Field(() => String)
  receiverId: string

  @Field(() => String)
  content: string

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Date)
  createddAt: Date
}
