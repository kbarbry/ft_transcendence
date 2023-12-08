import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionChannelMessageDoesNotExist extends HttpException {
  constructor() {
    super(
      "You are trying to reach a message that doesn't exist",
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionChannelMessageForbiddenAccess extends HttpException {
  constructor() {
    super(
      "You are trying to reach data that you're not authorized to access or edit",
      HttpStatus.CONFLICT
    )
  }
}
