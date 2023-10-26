import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionAlreadyBlocked extends HttpException {
  constructor() {
    super('The user is already blocked', HttpStatus.CONFLICT)
  }
}

export class ExceptionUserBlocked extends HttpException {
  constructor() {
    super('The user is blocked', HttpStatus.CONFLICT)
  }
}

export class ExceptionUserBlockedYou extends HttpException {
  constructor() {
    super('You are blocked by the other user', HttpStatus.CONFLICT)
  }
}

export class ExceptionBlockedYourself extends HttpException {
  constructor() {
    super('You can not block yourself', HttpStatus.CONFLICT)
  }
}
