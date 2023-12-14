import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionChannelMessageDoesNotExist extends HttpException {
  constructor() {
    super(
      "You are trying to reach a message that doesn't exist",
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionChannelMemberIsMuted extends HttpException {
  constructor() {
    super(
      'You are trying to send a message but you are muted',
      HttpStatus.CONFLICT
    )
  }
}
