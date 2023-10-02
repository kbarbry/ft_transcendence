import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionUserBlockedInChannel extends HttpException {
  constructor() {
    super('The user is blocked in this channel', HttpStatus.CONFLICT)
  }
}

export class ExceptionTryingToBlockChannelOwner extends HttpException {
  constructor() {
    super(
      'You are trying to block the owner of the channel',
      HttpStatus.CONFLICT
    )
  }
}
