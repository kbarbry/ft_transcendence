import { Injectable, PipeTransform } from '@nestjs/common'
import { InputType } from '@nestjs/graphql'
import { plainToClass } from 'class-transformer'
import {
  IsString,
  Length,
  Matches,
  ValidationOptions,
  registerDecorator,
  validateSync
} from 'class-validator'
import { ExceptionCustomClassValidator } from '../exceptions/class-validator.exception'

@InputType()
class CustomValidationPipeDto {
  @IsString({ message: '$property must be a string.' })
  @Length(1, 30, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  @Matches(/^[a-zA-Z0-9_\-\.]+( [a-zA-Z0-9_\-\.]+)?$/, {
    message:
      '$property can only contain letters, numbers, single spaces and "_-.".'
  })
  username: string
}

@Injectable()
export class UsernameValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const trimmedValue = value.trim()
    const dataClass = plainToClass(CustomValidationPipeDto, {
      username: trimmedValue
    })
    const error = validateSync(dataClass)
    if (error.length) throw new ExceptionCustomClassValidator(error)
    return trimmedValue
  }
}

export function CustomIsName(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'customUsernameValidator',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any) {
          try {
            new UsernameValidationPipe().transform(value)
            return true
          } catch (error) {
            return false
          }
        }
      }
    })
  }
}
