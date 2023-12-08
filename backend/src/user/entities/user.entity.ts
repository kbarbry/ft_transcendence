import { ObjectType, Field, Float, registerEnumType } from '@nestjs/graphql'
import { ELanguage, EStatus } from '@prisma/client'

@ObjectType()
export class User {
  @Field(() => String)
  id: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null

  @Field(() => String)
  mail: string

  @Field(() => String)
  username: string

  @Field(() => EStatus)
  status: EStatus

  @Field(() => Boolean)
  validation2fa: boolean

  @Field(() => ELanguage)
  languages: ELanguage

  @Field(() => Float)
  level: number

  @Field(() => Date)
  createdAt: Date
}

registerEnumType(EStatus, { name: 'EStatus' })
registerEnumType(ELanguage, { name: 'ELanguage' })
