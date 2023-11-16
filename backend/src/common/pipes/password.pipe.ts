import { Injectable, PipeTransform } from '@nestjs/common'
import { InputType } from '@nestjs/graphql'
import { plainToClass } from 'class-transformer'
import {
  IsString,
  Matches,
  Length,
  validateSync,
  registerDecorator,
  ValidationOptions
} from 'class-validator'
import { ExceptionCustomClassValidator } from '../exceptions/class-validator.exception'

@InputType()
class CustomValidationPipeDto {
  @IsString({ message: '$property must be a string.' })
  @Length(8, 50, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+=]).*$/, {
    message: '$property must meet password complexity requirements.'
  })
  password: string
}

@Injectable()
export class PasswordValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const trimmedValue = value.trim()
    const dataClass = plainToClass(CustomValidationPipeDto, {
      password: trimmedValue
    })
    const error = validateSync(dataClass)
    if (error.length) throw new ExceptionCustomClassValidator(error)
    return trimmedValue
  }
}

export function CustomIsPassword(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'customPasswordValidator',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any) {
          try {
            new PasswordValidationPipe().transform(value)
            return true
          } catch (error) {
            return false
          }
        }
      }
    })
  }
}
