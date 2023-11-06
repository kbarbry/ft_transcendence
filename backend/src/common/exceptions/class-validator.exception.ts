import { HttpException, HttpStatus } from '@nestjs/common'
import { ValidationError } from 'class-validator/types/validation/ValidationError'

type ResException = {
  property: string
  message: string
}

export class ExceptionClassValidator extends HttpException {
  constructor(result: ResException[]) {
    super(result, HttpStatus.I_AM_A_TEAPOT)
  }
}

export class ExceptionCustomClassValidator extends HttpException {
  constructor(result: ValidationError[]) {
    super(
      { message: "Data isn't well formatted", result },
      HttpStatus.I_AM_A_TEAPOT
    )
  }
}
