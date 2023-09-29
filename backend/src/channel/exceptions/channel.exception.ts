import { HttpException, HttpStatus } from '@nestjs/common'

export class ExceptionTryingToUpdateChannelID extends HttpException {
  constructor() {
    super('You are trying to change the id of a Channel', HttpStatus.CONFLICT)
  }
}

// export class ExceptionTryingToUpdateOwnerID extends HttpException {
//   constructor() {
//     super('You are trying to change the id of the Owner', HttpStatus.CONFLICT)
//   }
// }

export class ExceptionInvalidMaxUserInChannel extends HttpException {
  constructor() {
    super('Invalid max user number', HttpStatus.CONFLICT)
  }
}

export class ExceptionTryingToUpdateDate extends HttpException {
  constructor() {
    super('Invalid max user number', HttpStatus.CONFLICT)
  }
}

export class ExceptionInvalidDataMaxUsers extends HttpException {
  constructor() {
    super('Invalid data sent for maxUser', HttpStatus.CONFLICT)
  }
}

export class ExceptionUnknowUser extends HttpException {
  constructor() {
    super('User does not exists', HttpStatus.FORBIDDEN)
  }
}
