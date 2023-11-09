import { Injectable, PipeTransform } from '@nestjs/common'
import { InputType } from '@nestjs/graphql'
import { plainToClass } from 'class-transformer'
import { Length, Matches, validateSync } from 'class-validator'

@InputType()
class NanoidValidationDto {
  @Matches(/^[0-9a-zA-Z_-]+$/, { message: 'Invalid nanoid characters.' })
  @Length(21, 21, {
    message: '$property must be exactly $constraint1 characters long.'
  })
  id: string
}

@Injectable()
export class NanoidsValidationPipe
  implements PipeTransform<string[], string[]>
{
  transform(value: string[]): string[] {
    const dataClassArray: NanoidValidationDto[] = value.map((id) =>
      plainToClass(NanoidValidationDto, { id })
    )
    console.log(dataClassArray)

    const validDataClassArray = dataClassArray.filter((dataClass) => {
      const error = validateSync(dataClass)
      return error.length === 0
    })
    console.log(validDataClassArray)

    const validatedIds = validDataClassArray.map((dataClass) => dataClass.id)
    console.log(validatedIds)
    return validatedIds
  }
}
