import { HttpException, HttpStatus } from '@nestjs/common'

export class ChannelMessageExceptionEmptyMessage extends HttpException {
  constructor() {
    super('The message content is empty', HttpStatus.CONFLICT)
  }
}

export class ChannelMessageExceptionTryingToUpdateID extends HttpException {
  constructor() {
    super(
      'You are trying to change the id of a channel message',
      HttpStatus.CONFLICT
    )
  }
}

export class ChannelMessageExceptionTryingToUpdateChannelID extends HttpException {
  constructor() {
    super(
      'You are trying to change the id of the channel where the message was sent',
      HttpStatus.CONFLICT
    )
  }
}

export class ChannelMessageExceptionTryingToUpdateCreationDate extends HttpException {
  constructor() {
    super(
      'You are trying to change the creation date of a channel message',
      HttpStatus.CONFLICT
    )
  }
}
export class ChannelMessageExceptionTryingToUpdateSenderID extends HttpException {
  constructor() {
    super(
      "You are trying to change the senders's id of a channel message",
      HttpStatus.CONFLICT
    )
  }
}
