import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionRequestingYourself extends HttpException {
  constructor() {
    super('You are trying to request yourself', HttpStatus.CONFLICT)
  }
}
