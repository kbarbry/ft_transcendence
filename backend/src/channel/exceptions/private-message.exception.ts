import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToUpdatePrivateMessageID extends HttpException {
  constructor() {
    super(
      'You are trying to change the id of a PrivateMessage',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionTryingToUpdateUsersId extends HttpException {
  constructor() {
    super('You are trying to change the id of the users', HttpStatus.CONFLICT)
  }
}

export class ExceptionPrivateMessageYourself extends HttpException {
  constructor() {
    super('You are trying to send a message to yourself', HttpStatus.CONFLICT)
  }
}

export class ExceptionTryingToUpdateDateMessage extends HttpException {
  constructor() {
    super('You are trying to update the date of a message', HttpStatus.CONFLICT)
  }
}
