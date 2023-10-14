import { ObjectType, Field, Float, registerEnumType } from '@nestjs/graphql'
import { ELanguage, EStatus } from '@prisma/client'

@ObjectType()
export class User {
  @Field(() => String, { description: 'Id field from user' })
  id: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null

  @Field(() => String)
  mail: string

  @Field(() => String)
  username: string

  @Field(() => EStatus, { nullable: true })
  status?: EStatus

  @Field(() => ELanguage, { nullable: true })
  languages?: ELanguage

  @Field(() => Float, { nullable: true })
  level?: number

  @Field(() => Date, { nullable: true })
  createdAt?: Date
}

registerEnumType(EStatus, { name: 'EStatus' })
registerEnumType(ELanguage, { name: 'ELanguage' })
