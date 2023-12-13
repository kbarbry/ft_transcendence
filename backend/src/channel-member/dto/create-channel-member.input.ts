import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsUrl, Length, Matches } from 'class-validator'
import { CustomIsName } from '../../common/pipes/username.pipe'
import { CustomIsChannelPassword } from 'src/common/pipes/password-channel.pipe'

@InputType()
export class CreateChannelMemberInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl({}, { message: '$property must be a valid URL.' })
  @Length(1, 2083, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  avatarUrl?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @CustomIsName({
    message:
      '$property must be between 1 and 30 characters long and must only contain letters, number and single spaces.'
  })
  nickname?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @CustomIsChannelPassword({
    message:
      '$property must be between 1 and 30 characters long, and can only contain these special characters: "!@#$%^&+=" '
  })
  channelPassword?: string

  @Field(() => String)
  @Matches(/^[0-9a-zA-Z_-]+$/, { message: 'Invalid nanoid characters.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  userId: string

  @Field(() => String)
  @Matches(/^[0-9a-zA-Z_-]+$/, { message: 'Invalid nanoid characters.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  channelId: string
}
