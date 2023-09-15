import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionUsersAlreadyFriend extends HttpException {
  constructor() {
    super('You already are friend with the user', HttpStatus.CONFLICT)
  }
}
