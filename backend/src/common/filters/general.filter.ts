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
import { ELogType, LoggingService } from '../logging/file.logging'
import { Response } from 'express'

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
  private readonly loggingService = new LoggingService(ELogType.error)

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const request = context.getRequest<Request>()
    const response = context.getResponse<Response>()
    const restError = request?.url ? true : false

    if (restError) {
      this.loggingService.log('-- RestAPI exception generated --')
      return this.handleRestAPIException(exception, response)
    } else {
      this.loggingService.log('-- GraphQL exception generated --')
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
      this.loggingService.log('- prisma error -')

      if (code === EErrorPrisma.P2002)
        message = `${meta ? meta.target : 'Field'} is already taken.`
      else if (code === EErrorPrisma.P2003)
        message = `The entity you are trying to reach doesn't exist.`
      else this.loggingService.log('UNHANDLED ERROR')

      customError = new GraphQLError(message, { extensions })
    } else if (exception instanceof ExceptionClassValidator) {
      const type = EErrorOrigin.ClassValidator
      const code = HttpStatus.I_AM_A_TEAPOT
      const meta = exception.getResponse()
      const extensions = { type, code, meta }
      const message = `Data isn't well formated`
      this.loggingService.log('- class validator error -')

      customError = new GraphQLError(message, { extensions })
    } else if (exception instanceof ExceptionCustomClassValidator) {
      const type = EErrorOrigin.CustomClassValidator
      const code = HttpStatus.I_AM_A_TEAPOT
      const meta = exception.getResponse()
      const extensions = { type, code, meta }
      const message = `Data isn't well formated`
      this.loggingService.log('- custom class validator error -')

      customError = new GraphQLError(message, { extensions })
    } else if (exception.status === HttpStatus.CONFLICT) {
      const type = EErrorOrigin.CustomException
      const code = HttpStatus.CONFLICT
      const meta = exception.getResponse()
      const extensions = { type, code, meta }
      const message = `Your data contains some conflict with our application`
      this.loggingService.log('- custom conflict error -')

      customError = new GraphQLError(message, { extensions })
    } else if (exception instanceof UnauthorizedException) {
      const type = EErrorOrigin.ServerError
      const code = HttpStatus.UNAUTHORIZED
      const meta = { redirect: '/login', ...exception }
      const extensions = { type, code, meta }
      const message = `You're not authorized to access this data`
      this.loggingService.log('- unauthorized error -')

      customError = new GraphQLError(message, { extensions })
    } else {
      const type = EErrorOrigin.Unhandled
      const code = HttpStatus.BAD_REQUEST
      const meta = { redirect: '/login' }
      const extensions = { type, code, meta }
      const message = 'Unhandled error'
      this.loggingService.log('- non catched error -')
      this.loggingService.log('UNHANDLED ERROR')
      this.loggingService.log(exception)
      console.log(exception)

      customError = new GraphQLError(message, { extensions })
    }

    this.loggingService.log(JSON.stringify(customError))
    return customError
  }

  private handleRestAPIException(exception: any, response: Response) {
    let customError: CustomRestApiError
    let statusCode: number

    if (exception instanceof PrismaClientKnownRequestError) {
      const type = EErrorOrigin.Prisma
      const code = exception.code
      const meta = exception.meta
      let message = `Prisma unhandled error`
      statusCode = HttpStatus.BAD_REQUEST
      this.loggingService.log('- prisma error -')

      if (code === EErrorPrisma.P2002)
        message = `${meta ? meta.target : 'Field'} is already taken.`
      else if (code === EErrorPrisma.P2003)
        message = `The entity you are trying to reach doesn't exist.`
      else this.loggingService.log('UNHANDLED ERROR')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (exception instanceof ExceptionClassValidator) {
      const type = EErrorOrigin.ClassValidator
      const code = HttpStatus.I_AM_A_TEAPOT
      const meta = exception.getResponse()
      const message = `Data isn't well formated`
      statusCode = HttpStatus.I_AM_A_TEAPOT
      this.loggingService.log('- class validator error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (exception instanceof ExceptionCustomClassValidator) {
      const type = EErrorOrigin.CustomClassValidator
      const code = HttpStatus.I_AM_A_TEAPOT
      const meta = exception.getResponse()
      const message = `Data isn't well formated`
      statusCode = HttpStatus.I_AM_A_TEAPOT
      this.loggingService.log('- custom class validator error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (exception.status === HttpStatus.CONFLICT) {
      const type = EErrorOrigin.CustomException
      const code = HttpStatus.CONFLICT
      const meta = exception.getResponse()
      const message = exception
        ? exception.message
        : `Your data contains some conflict with our application`
      statusCode = HttpStatus.CONFLICT
      this.loggingService.log('- custom conflict error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (exception instanceof ExceptionUnauthorizedStrategy) {
      const type = EErrorOrigin.InvalidStrategy
      const code = HttpStatus.UNAUTHORIZED
      const meta = { redirect: '/login', ...exception }
      const message = `You're not using the right strategy`
      statusCode = HttpStatus.UNAUTHORIZED
      this.loggingService.log('- unauthorized strategy error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (
      exception instanceof ExceptionInvalidCredentials ||
      exception?.message?.includes('Failed to obtain access token') ||
      exception?.code?.includes('invalid_grant')
    ) {
      const type = EErrorOrigin.InvalidCredentials
      const code = HttpStatus.UNAUTHORIZED
      const meta = { redirect: '/login' }
      const message = exception?.message
        ? exception.message
        : `Invalid credentials`
      statusCode = HttpStatus.UNAUTHORIZED
      this.loggingService.log('- invalid credentials error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else if (exception instanceof NotFoundException) {
      const type = EErrorOrigin.ServerError
      const code = HttpStatus.NOT_FOUND
      const meta = { redirect: '/404', ...exception }
      const message = `404 - Not found`
      statusCode = HttpStatus.NOT_FOUND
      this.loggingService.log('- Not found error -')

      customError = new CustomRestApiError(type, code, message, meta)
    } else {
      const type = EErrorOrigin.Unhandled
      const code = HttpStatus.BAD_REQUEST
      const meta = { redirect: '/login' }
      const message = `Unhandled error`
      statusCode = HttpStatus.BAD_REQUEST
      this.loggingService.log('- non catched error -')
      this.loggingService.log('UNHANDLED ERROR')
      this.loggingService.log(exception)
      console.log(exception)

      customError = new CustomRestApiError(type, code, message, meta)
    }
    this.loggingService.log(JSON.stringify(customError))
    response.status(statusCode).json({
      type: customError.type,
      code: customError.code,
      message: customError.message,
      meta: customError.meta
    })
  }
}
