import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToUpdatePrivateMessageID extends HttpException {
  constructor() {
    super(
      'You are trying to change the id of a PrivateMessage',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionPrivateMessageYourself extends HttpException {
  constructor() {
    super('You are trying to send a message to yourself', HttpStatus.CONFLICT)
  }
}
