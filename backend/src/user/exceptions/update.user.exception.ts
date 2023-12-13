import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionUsernameAlreadyUsed extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED)
  }
}
