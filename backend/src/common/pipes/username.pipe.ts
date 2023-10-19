import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common'
import { isString, length } from 'class-validator'

@Injectable()
export class UsernameValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!isString(value) || !length(value, 1, 30)) {
      throw new BadRequestException('Invalid string format')
    }

    return value
  }
}
