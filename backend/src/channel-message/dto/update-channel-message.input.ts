import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdateChannelMessageInput {
  @Field(() => String)
  @IsString({ always: true })
  @IsNotEmpty()
  @MaxLength(2000)
  content: string
}
