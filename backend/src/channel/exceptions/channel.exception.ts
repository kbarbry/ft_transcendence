import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionInvalidMaxUserInChannel extends HttpException {
  constructor() {
    super('The max user limit have been reached', HttpStatus.CONFLICT)
  }
}
