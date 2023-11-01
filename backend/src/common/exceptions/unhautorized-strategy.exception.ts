import { UnauthorizedException } from '@nestjs/common'
import { EStrategy } from 'src/auth/utils/check.utils'

export class ExceptionUnhautorizedStrategy extends UnauthorizedException {
  constructor(strategy: EStrategy, acceptedStrategies: EStrategy[]) {
    super('Unauthorized strategy')

    this.strategy = strategy
    this.acceptedStrategies = acceptedStrategies
  }

  public strategy: string
  public acceptedStrategies: string[]
}
