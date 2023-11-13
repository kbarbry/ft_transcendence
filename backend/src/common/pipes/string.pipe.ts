import { Injectable, PipeTransform } from '@nestjs/common'
import { InputType } from '@nestjs/graphql'
import { plainToClass } from 'class-transformer'
import { IsString, Length, validateSync } from 'class-validator'
import { ExceptionCustomClassValidator } from '../exceptions/class-validator.exception'

@InputType()
class CustomValidationPipeDto {
  @IsString({ message: '$property must be a string.' })
  @Length(1, 1000, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  string: string
}

@Injectable()
export class StringValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const dataClass = plainToClass(CustomValidationPipeDto, { string: value })
    const error = validateSync(dataClass)
    if (error.length) throw new ExceptionCustomClassValidator(error)
    return value
  }
}
