import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToUpdateChannelID extends HttpException {
  constructor() {
    super('You are trying to change the id of a Channel', HttpStatus.CONFLICT)
  }
}

export class ExceptionInvalidMaxUserInChannel extends HttpException {
  constructor() {
    super('Invalid max user number', HttpStatus.CONFLICT)
  }
}

export class ExceptionTryingToUpdateDate extends HttpException {
  constructor() {
    super(
      'You are trying to change the createdAt of a Channel',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionInvalidDataMaxUsers extends HttpException {
  constructor() {
    super('Invalid data sent for maxUser', HttpStatus.CONFLICT)
  }
}

export class ExceptionMaxUsersReachedInChannel extends HttpException {
  constructor() {
    super('Too many users in channel, max users reached', HttpStatus.CONFLICT)
  }
}
