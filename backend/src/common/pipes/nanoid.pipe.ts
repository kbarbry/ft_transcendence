import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common'

@Injectable()
export class NanoidValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const nanoidRegex = /^[A-Za-z0-9_-]{21}$/

    if (!nanoidRegex.test(value)) {
      throw new BadRequestException('Invalid nanoid format')
    }

    return value
  }
}
