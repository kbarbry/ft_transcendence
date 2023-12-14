import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionPrivateMessageYourself extends HttpException {
  constructor() {
    super('You are trying to send a message to yourself', HttpStatus.CONFLICT)
  }
}

export class ExceptionPrivateMessageDoesNotExist extends HttpException {
  constructor() {
    super(
      "You are trying to reach a message that doesn't exist",
      HttpStatus.CONFLICT
    )
  }
}
