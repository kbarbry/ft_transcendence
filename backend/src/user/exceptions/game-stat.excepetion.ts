import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToUpdateID extends HttpException {
  constructor() {
    super('You are trying to change the id of a gameStat', HttpStatus.CONFLICT)
  }
}

export class ExceptionSamePlayerInGame extends HttpException {
  constructor() {
    super(
      'You are trying to make a game with the same player',
      HttpStatus.CONFLICT
    )
  }
}
