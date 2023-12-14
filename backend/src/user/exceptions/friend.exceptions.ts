import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionUsersAlreadyFriend extends HttpException {
  constructor() {
    super('You already are friend with the user', HttpStatus.CONFLICT)
  }
}

export class ExceptionRelationFriendForbiddenAccess extends HttpException {
  constructor() {
    super(
      "You are trying to reach data that you're not authorized to access or edit",
      HttpStatus.CONFLICT
    )
  }
}
