import { Injectable, PipeTransform } from '@nestjs/common'
import { InputType } from '@nestjs/graphql'
import { plainToClass } from 'class-transformer'
import {
  IsString,
  Length,
  ValidationOptions,
  registerDecorator,
  validateSync
} from 'class-validator'
import { ExceptionCustomClassValidator } from '../exceptions/class-validator.exception'

@InputType()
class CustomValidationPipeDto {
  @IsString({ message: '$property must be a string.' })
  @Length(1, 1024, {
    message:
      '$property must be between $constraint1 and $constraint2 characters long.'
  })
  topic: string
}

@Injectable()
export class TopicValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const trimmedValue = value.trim()
    const dataClass = plainToClass(CustomValidationPipeDto, {
      topic: trimmedValue
    })
    const error = validateSync(dataClass)
    if (error.length) throw new ExceptionCustomClassValidator(error)
    return trimmedValue
  }
}

export function CustomIsTopic(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'customTopicValidator',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any) {
          try {
            new TopicValidationPipe().transform(value)
            return true
          } catch (error) {
            return false
          }
        }
      }
    })
  }
}
