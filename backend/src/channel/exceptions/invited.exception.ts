import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionUserNotInvited extends HttpException {
  constructor() {
    super(
      'The user is not invited in this protected channel',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionUserAlreadyInvited extends HttpException {
  constructor() {
    super(
      'The user you are trying to invite is already invited in the channel',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionUserAlreadyInChannel extends HttpException {
  constructor() {
    super(
      'The user you are trying to invite is already in the channel',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionTryingToInviteABlockedUser extends HttpException {
  constructor() {
    super(
      'The user you are trying to invite is blocked in this channel',
      HttpStatus.CONFLICT
    )
  }
}
