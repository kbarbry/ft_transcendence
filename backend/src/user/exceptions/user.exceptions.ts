import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionUserTryingToUpdateID extends HttpException {
  constructor() {
    super('You are trying to change the id of a user', HttpStatus.CONFLICT)
  }
}

export class ExceptionUserTryingToUpdateCreationDate extends HttpException {
  constructor() {
    super(
      'You are trying to change the creation date of a user',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionUserTryingToUpdateEmail extends HttpException {
  constructor() {
    super(
      'You are trying to change the creation date of a user',
      HttpStatus.CONFLICT
    )
  }
}
