import { Injectable, PipeTransform } from '@nestjs/common'
import { InputType } from '@nestjs/graphql'
import { plainToClass } from 'class-transformer'
import { IsEmail, validateSync } from 'class-validator'
import { ExceptionCustomClassValidator } from '../exceptions/class-validator.exception'

@InputType()
class CustomValidationPipeDto {
  @IsEmail({}, { message: '$property must be a valid email address.' })
  mail: string
}

@Injectable()
export class EmailValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const dataClass = plainToClass(CustomValidationPipeDto, { mail: value })
    const error = validateSync(dataClass)
    if (error.length) throw new ExceptionCustomClassValidator(error)
    return value
  }
}
