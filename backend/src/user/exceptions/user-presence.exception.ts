import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToUpdateID extends HttpException {
  constructor() {
    super(
      'You are trying to change the id of a user-presence',
      HttpStatus.CONFLICT
    )
  }
}
