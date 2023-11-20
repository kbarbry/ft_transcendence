import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionMaxUserReachedInChannel extends HttpException {
  constructor() {
    super('The max user limit have been reached', HttpStatus.CONFLICT)
  }
}

export class ExceptionInvalidMaxUserInChannel extends HttpException {
  constructor() {
    super(
      'There is too many users in this server for this maxUser limit',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionChannelMemberNotCreatedInChannelCreation extends HttpException {
  constructor() {
    super(
      'Channel creation comes with a channelMember creation, channelMember creation failed',
      HttpStatus.CONFLICT
    )
  }
}
