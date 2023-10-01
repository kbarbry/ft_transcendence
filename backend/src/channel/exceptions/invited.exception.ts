import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionUserNotInvited extends HttpException {
  constructor() {
    super(
      'The user is not invited in this protected channel',
      HttpStatus.CONFLICT
    )
  }
}
