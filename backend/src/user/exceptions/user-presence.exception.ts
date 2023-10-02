import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionIsConnectedShouldBeTrue extends HttpException {
  constructor() {
    super(
      'You are trying to create an user with false isConnected',
      HttpStatus.CONFLICT
    )
  }
}
