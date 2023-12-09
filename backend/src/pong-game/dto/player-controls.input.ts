import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean } from 'class-validator'

@InputType()
export class ControlsInput {
  @Field(() => Boolean)
  @IsBoolean({ message: '$property must be a boolean.' })
  Z_Key: boolean

  @Field(() => Boolean)
  @IsBoolean({ message: '$property must be a boolean.' })
  S_Key: boolean

  @Field(() => Boolean)
  @IsBoolean({ message: '$property must be a boolean.' })
  Up_Key: boolean

  @Field(() => Boolean)
  @IsBoolean({ message: '$property must be a boolean.' })
  Down_Key: boolean
}
