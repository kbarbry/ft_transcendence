import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class PrivateMessage {
  @Field(() => String, { description: 'Id Private Message', nullable: true })
  id?: string

  @Field(() => String)
  senderId: string

  @Field(() => String)
  receiverId: string

  @Field(() => String)
  content: string

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null

  @Field(() => Date, { nullable: true })
  createddAt?: Date
}
