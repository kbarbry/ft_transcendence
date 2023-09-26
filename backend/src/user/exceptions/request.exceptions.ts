import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionRequestAlreadySent extends HttpException {
  constructor() {
    super('The request already had been sent', HttpStatus.CONFLICT)
  }
}

export class ExceptionRequestingYourself extends HttpException {
  constructor() {
    super('You are trying to request yourself', HttpStatus.CONFLICT)
  }
}
