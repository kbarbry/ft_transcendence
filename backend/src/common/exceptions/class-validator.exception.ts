import { HttpException, HttpStatus } from '@nestjs/common'

type ResException = {
  property: string
  message: string
}

export class ExceptionClassValidator extends HttpException {
  constructor(result: ResException[]) {
    super(result, HttpStatus.I_AM_A_TEAPOT)
  }
}
