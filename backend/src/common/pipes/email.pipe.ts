import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common'
import { isEmail } from 'class-validator'

@Injectable()
export class EmailValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!isEmail(value)) {
      throw new BadRequestException('Invalid email format')
    }

    return value
  }
}
