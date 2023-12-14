import { Field } from '@nestjs/graphql'
import {
  Length,
  IsNumber,
  IsOptional,
  Matches,
  IsNumberString
} from 'class-validator'

export class Validation2fauth {
  @Field(() => String)
  @IsOptional()
  @Length(6, 6, {
    message: '$property must be $constraint1 characters long.'
  })
  @IsNumberString(
    { no_symbols: true },
    { message: '$property must contain only numbers.' }
  )
  otp?: string

  @Field(() => String)
  @Matches(/^[0-9a-zA-Z_-]+$/, { message: 'Invalid nanoid characters.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  id: string
}
