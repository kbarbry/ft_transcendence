import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToUpdateChannelMemberID extends HttpException {
  constructor() {
    super(
      'You are trying to change the id of a channelMember',
      HttpStatus.CONFLICT
    )
  }
}
