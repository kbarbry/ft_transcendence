import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { GraphQLError } from 'graphql'
import {
  ExceptionClassValidator,
  ExceptionCustomClassValidator
} from '../exceptions/class-validator.exception'
import {
  ExceptionInvalidCredentials,
  ExceptionUnauthorizedStrategy
} from '../exceptions/unauthorized-strategy.exception'
import { LoggingService } from '../logging/exception.logging'

enum EErrorOrigin {
  Prisma = 'prisma',
  ClassValidator = 'ClassValidator',
  CustomClassValidator = 'CustomClassValidator',
  CustomException = 'CustomException',
  InvalidStrategy = 'InvalidStrategy',
  InvalidCredentials = 'InvalidCredentials',
  ServerError = 'ServerError'
}

enum EErrorPrisma {
  P2002 = 'P2002',
  P2003 = 'P2003'
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private loggingService = new LoggingService()

  catch(exception: any, host: ArgumentsHost) {
    let customError: GraphQLError

    this.loggingService.logError('-- exception generated --')
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    if (response.url) return null

    if (exception instanceof PrismaClientKnownRequestError) {
      const type = EErrorOrigin.Prisma
      const code = exception.code
      const meta = exception.meta
      const extensions = { type, code, meta }
      let message = 'Prisma unhandled error'
      this.loggingService.logError('- prisma error -')

      if (code === EErrorPrisma.P2002)
        message = `${meta ? meta.target : 'Field'} is already taken.`
      if (code === EErrorPrisma.P2003)
        message = `The entity you are trying to reach doesn't exist.`
      else this.loggingService.logError('UNHANDLED ERROR')

      customError = new GraphQLError(message, { extensions })
    } else if (exception instanceof ExceptionClassValidator) {
      const type = EErrorOrigin.ClassValidator
      const code = HttpStatus.I_AM_A_TEAPOT
      const meta = exception.getResponse()
      const extensions = { type, code, meta }
      const message = `Data isn't well formated`
      this.loggingService.logError('- class validator error -')

      customError = new GraphQLError(message, { extensions })
    } else if (exception instanceof ExceptionCustomClassValidator) {
      const type = EErrorOrigin.CustomClassValidator
      const code = HttpStatus.I_AM_A_TEAPOT
      const meta = exception.getResponse()
      const extensions = { type, code, meta }
      const message = `Data isn't well formated`
      this.loggingService.logError('- custom class validator error -')

      customError = new GraphQLError(message, { extensions })
    } else if (exception.status === HttpStatus.CONFLICT) {
      const type = EErrorOrigin.CustomException
      const code = HttpStatus.CONFLICT
      const meta = exception.getResponse()
      const extensions = { type, code, meta }
      const message = `Your data contains some conflict with our application`
      this.loggingService.logError('- custom conflict error -')

      customError = new GraphQLError(message, { extensions })
    } else if (exception instanceof ExceptionUnauthorizedStrategy) {
      const type = EErrorOrigin.InvalidStrategy
      const code = HttpStatus.UNAUTHORIZED
      const meta = { redirect: '/login', ...exception }
      const extensions = { type, code, meta }
      const message = `You're not using the right strategy`
      this.loggingService.logError('- unauthorized strategy error -')

      customError = new GraphQLError(message, { extensions })
    } else if (exception instanceof UnauthorizedException) {
      const type = EErrorOrigin.ServerError
      const code = HttpStatus.UNAUTHORIZED
      const meta = { redirect: '/login', ...exception }
      const extensions = { type, code, meta }
      const message = `You're not authorized to access this data`
      this.loggingService.logError('- unauthorized error -')

      customError = new GraphQLError(message, { extensions })
    } else if (
      exception instanceof ExceptionInvalidCredentials ||
      exception.message.includes('Failed to obtain access token') ||
      exception.code.includes('invalid_grant')
    ) {
      const type = EErrorOrigin.InvalidCredentials
      const code = HttpStatus.UNAUTHORIZED
      const meta = { redirect: '/login', ...exception }
      const extensions = { type, code, meta }
      const message = `Invalid credentials`
      this.loggingService.logError('- invalid credentials error -')

      customError = new GraphQLError(message, { extensions })
    } else {
      this.loggingService.logError('- non catched error -')
      this.loggingService.logError('UNHANDLED ERROR')
      this.loggingService.logError(exception)
      console.log(exception)
      customError = new GraphQLError('Unhandled error', exception)
    }

    this.loggingService.logError(JSON.stringify(customError))
    return customError
  }
}
