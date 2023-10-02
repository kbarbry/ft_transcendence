import { HttpException, HttpStatus } from '@nestjs/common'

export class UserExceptionTryingToUpdateID extends HttpException {
  constructor() {
    super('You are trying to change the id of a user', HttpStatus.CONFLICT)
  }
}

export class UserExceptionTryingToUpdateCreationDate extends HttpException {
  constructor() {
    super(
      'You are trying to change the creation date of a user',
      HttpStatus.CONFLICT
    )
  }
}

export class UserExceptionTryingToUpdateEmail extends HttpException {
  constructor() {
    super(
      'You are trying to change the creation date of a user',
      HttpStatus.CONFLICT
    )
  }
}
