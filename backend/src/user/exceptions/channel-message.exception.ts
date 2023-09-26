import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToUpdateID extends HttpException {
  constructor() {
    super(
      'You are trying to change the id of a channel message',
      HttpStatus.CONFLICT
    )
  }
}
