import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToMakeAdminAnAdmin extends HttpException {
  constructor() {
    super('You are trying to make an admin with an Admin', HttpStatus.CONFLICT)
  }
}

export class ExceptionTryingToUnmakeAdminAMember extends HttpException {
  constructor() {
    super('You are trying to demote admin in a Member', HttpStatus.CONFLICT)
  }
}

export class ExceptionTryingToUnmakeAdminTheOwner extends HttpException {
  constructor() {
    super(
      'You are trying to demote admin in the server owner',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionTryingToMuteAMuted extends HttpException {
  constructor() {
    super(
      'You are trying mute an already muted ChannelMember',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionTryingToUnmuteAnUnmuted extends HttpException {
  constructor() {
    super(
      'You are trying to unmute an already unmuted channel member',
      HttpStatus.CONFLICT
    )
  }
}

export class ExceptionUserNotFound extends HttpException {
  constructor() {
    super('User not found for creation of channel member', HttpStatus.CONFLICT)
  }
}
