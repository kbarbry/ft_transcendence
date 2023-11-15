import { Injectable, PipeTransform } from '@nestjs/common'
import { InputType } from '@nestjs/graphql'
import { plainToClass } from 'class-transformer'
import {
  IsEmail,
  Matches,
  ValidationOptions,
  registerDecorator,
  validateSync
} from 'class-validator'
import { ExceptionCustomClassValidator } from '../exceptions/class-validator.exception'

@InputType()
class CustomValidationPipeDto {
  @IsEmail({}, { message: '$property must be a valid email address.' })
  @Matches(
    /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\([^()]*\)|[^()])*$/,
    {
      message:
        '$property must be a valid email address with allowed characters: ._%+-'
    }
  )
  mail: string
}

@Injectable()
export class EmailValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const trimmedValue = value.trim()
    const dataClass = plainToClass(CustomValidationPipeDto, {
      mail: trimmedValue
    })
    const error = validateSync(dataClass)
    if (error.length) throw new ExceptionCustomClassValidator(error)
    return value
  }
}

export function CustomIsEmail(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'customEmailValidator',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any) {
          try {
            new EmailValidationPipe().transform(value)
            return true
          } catch (error) {
            return false
          }
        }
      }
    })
  }
}
