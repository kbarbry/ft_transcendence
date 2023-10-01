import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionUserBlockedInChannel extends HttpException {
  constructor() {
    super('The user is blocked in this channel', HttpStatus.CONFLICT)
  }
}
