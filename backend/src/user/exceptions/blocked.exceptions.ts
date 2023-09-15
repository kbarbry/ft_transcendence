import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionAlreadyBlocked extends HttpException {
  constructor() {
    super('The user already is blocked', HttpStatus.CONFLICT)
  }
}

export class ExceptionUserBlocked extends HttpException {
  constructor() {
    super('The user is blocked', HttpStatus.CONFLICT)
  }
}

export class ExceptionUserBlockedYou extends HttpException {
  constructor() {
    super('You are blocked by the other user', HttpStatus.FORBIDDEN)
  }
}
