import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToUpdateChannelMemberUserID extends HttpException {
  constructor() {
    super(
      'You are trying to change the userId of a channelMember',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionTryingToUpdateChannelMemberChannelId extends HttpException {
  constructor() {
    super(
      'You are trying to change the channelId of a channelMember',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionTryingToUpdateChannelMemberCreatedAt extends HttpException {
  constructor() {
    super(
      'You are trying to change the createdAt of a Channel',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionTryingToUpdateChannelMemberType extends HttpException {
  constructor() {
    super('You are trying to change the Type of a Channel', HttpStatus.CONFLICT)
  }
}
