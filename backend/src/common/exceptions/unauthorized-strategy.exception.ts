import {
  HttpException,
  HttpStatus,
  UnauthorizedException
} from '@nestjs/common'
import { EStrategy } from 'src/auth/utils/check.utils'

export class ExceptionUnauthorizedStrategy extends UnauthorizedException {
  constructor(strategy: EStrategy, acceptedStrategies: EStrategy[]) {
    super('Unauthorized strategy')

    this.strategy = strategy
    this.acceptedStrategies = acceptedStrategies
  }

  public strategy: string
  public acceptedStrategies: string[]
}

export class ExceptionInvalidCredentials extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED)
  }
}
export class ExceptionCustom extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT)
  }
}
