import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToMakeAdminAnAdmin extends HttpException {
  constructor() {
    super('You are trying to make an admin with an Admin', HttpStatus.CONFLICT)
  }
}

export class ExceptionTryingToMuteAMuted extends HttpException {
  constructor() {
    super('You are trying to make an admin with an Admin', HttpStatus.CONFLICT)
  }
}

export class ExceptionTryingToUnmuteAnUnmuted extends HttpException {
  constructor() {
    super('You are trying to make an admin with an Admin', HttpStatus.CONFLICT)
  }
}
