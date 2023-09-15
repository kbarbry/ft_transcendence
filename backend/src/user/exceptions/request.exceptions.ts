import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionRequestAlreadySent extends HttpException {
  constructor() {
    super('The request already had been sent', HttpStatus.CONFLICT)
  }
}
