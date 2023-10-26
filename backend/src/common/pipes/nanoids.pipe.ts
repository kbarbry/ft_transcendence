import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class NanoidsValidationPipe
  implements PipeTransform<string[], string[]>
{
  transform(value: string[]): string[] {
    const nanoidRegex = /^[A-Za-z0-9_-]{21}$/
    const validatedArray = value.filter((element) => nanoidRegex.test(element))

    return validatedArray
  }
}
