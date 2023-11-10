import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
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
  ServerError = 'ServerError',
  Unhandled = 'Unhandled'
}

enum EErrorPrisma {
  P2002 = 'P2002',
  P2003 = 'P2003'
}

class CustomRestApiError {
  constructor(
    public type: string,
    public code: number | string,
    public message: string,
    public meta: any
  ) {}
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private loggingService = new LoggingService()

  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>()
    const restError = request?.url ? true : false
    if (restError) {
      this.loggingService.logError('-- RestAPI exception generated --')
      return this.handleRestAPIException(exception)
    } else {
      this.loggingService.logError('-- GraphQL exception generated --')
      return this.handleGraphQLException(exception)
    }
  }

  private handleGraphQLException(exception: any) {
    let customError: GraphQLError

    if (exception instanceof PrismaClientKnownRequestError) {
      const type = EErrorOrigin.Prisma
      const code = exception.code
      const meta = exception.meta
      const extensions = { type, code, meta }
      let message = 'Prisma unhandled error'
      this.loggingService.logError('- prisma error -')

      if (code === EErrorPrisma.P2002)
        message = `${meta ? meta.target : 'Field'} is already taken.`
      else if (code === EErrorPrisma.P2003)
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
    } else if (exception instanceof UnauthorizedException) {
      const type = EErrorOrigin.ServerError
      const code = HttpStatus.UNAUTHORIZED
      const meta = { redirect: '/login', ...exception }
      const extensions = { type, code, meta }
      const message = `You're not authorized to access this data`
      this.loggingService.logError('- unauthorized error -')

      customError = new GraphQLError(message, { extensions })
    } else {
      const type = EErrorOrigin.Unhandled
      const code = HttpStatus.BAD_REQUEST
      const meta = { redirect: '/login' }
      const extensions = { type, code, meta }
      const message = 'Unhandled error'
      this.loggingService.logError('- non catched error -')
      this.loggingService.logError('UNHANDLED ERROR')
      this.loggingService.logError(exception)
      console.log(exception)

      customError = new GraphQLError(message, { extensions })
    }

    this.loggingService.logError(JSON.stringify(customError))
    return customError
  }

  private handleRestAPIException(exception: any) {
    let customError: CustomRestApiError

    if (exception instanceof PrismaClientKnownRequestError) {
      const type = EErrorOrigin.Prisma
      const code = exception.code
      const meta = exception.meta
      let message = `Prisma unhandled error`
      this.loggingService.logError('- prisma error -')

      if (code === EErrorPrisma.P2002)
        message = `${meta ? meta.target : 'Field'} is already taken.`
      else if (code === EErrorPrisma.P2003)
        message = `The entity you are trying to reach doesn't exist.`
      else this.loggingService.logError('UNHANDLED ERROR')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (exception instanceof ExceptionClassValidator) {
      const type = EErrorOrigin.ClassValidator
      const code = HttpStatus.I_AM_A_TEAPOT
      const meta = exception.getResponse()
      const message = `Data isn't well formated`
      this.loggingService.logError('- class validator error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (exception instanceof ExceptionCustomClassValidator) {
      const type = EErrorOrigin.CustomClassValidator
      const code = HttpStatus.I_AM_A_TEAPOT
      const meta = exception.getResponse()
      const message = `Data isn't well formated`
      this.loggingService.logError('- custom class validator error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (exception instanceof ExceptionUnauthorizedStrategy) {
      const type = EErrorOrigin.InvalidStrategy
      const code = HttpStatus.UNAUTHORIZED
      const meta = { redirect: '/login', ...exception }
      const message = `You're not using the right strategy`
      this.loggingService.logError('- unauthorized strategy error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (
      exception instanceof ExceptionInvalidCredentials ||
      exception?.message?.includes('Failed to obtain access token') ||
      exception?.code?.includes('invalid_grant')
    ) {
      const type = EErrorOrigin.InvalidCredentials
      const code = HttpStatus.UNAUTHORIZED
      const meta = { redirect: '/login' }
      const message = `Invalid credentials`
      this.loggingService.logError('- invalid credentials error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (exception instanceof NotFoundException) {
      const type = EErrorOrigin.ServerError
      const code = HttpStatus.NOT_FOUND
      const meta = { redirect: '/404', ...exception }
      const message = `404 - Not found`
      this.loggingService.logError('- Not found error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else {
      const type = EErrorOrigin.Unhandled
      const code = HttpStatus.BAD_REQUEST
      const meta = { redirect: '/login' }
      const message = `Unhandled error`
      this.loggingService.logError('- non catched error -')
      this.loggingService.logError('UNHANDLED ERROR')
      this.loggingService.logError(exception)
      console.log(exception)

      customError = new CustomRestApiError(type, code, message, meta)
    }

    this.loggingService.logError(JSON.stringify(customError))
    return customError
  }
}
