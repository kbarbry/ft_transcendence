import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'

export enum ECreationType {
  request = 'request',
  friend = 'friend'
}

@ObjectType()
export class RelationRequests {
  @Field(() => String)
  userSenderId: string

  @Field(() => String)
  userReceiverId: string

  @Field(() => ECreationType, { nullable: true })
  type?: ECreationType
}

registerEnumType(ECreationType, { name: 'ECreationType' })
