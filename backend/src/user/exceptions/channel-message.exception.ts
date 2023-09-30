import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionEmptyMessage extends HttpException {
  constructor() {
    super('The message content is empty', HttpStatus.CONFLICT)
  }
}

export class ExceptionTryingToUpdateID extends HttpException {
  constructor() {
    super(
      'You are trying to change the id of a channel message',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionTryingToUpdateCreationDate extends HttpException {
  constructor() {
    super(
      'You are trying to change the creation date of a channel message',
      HttpStatus.CONFLICT
    )
  }
}
export class ExceptionTryingToUpdateSenderID extends HttpException {
  constructor() {
    super(
      "You are trying to change the senders's id of a channel message",
      HttpStatus.CONFLICT
    )
  }
}
