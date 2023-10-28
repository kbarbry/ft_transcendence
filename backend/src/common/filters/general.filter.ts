import {
  BadRequestException,
  Catch,
  HttpStatus,
  UnauthorizedException
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { ExceptionClassValidator } from '../exceptions/class-validator.exception'

enum EErrorOrigin {
  Prisma = 'prisma',
  ClassValidator = 'ClassValidator',
  CustomException = 'CustomException',
  ServerError = 'ServerError'
}

enum EErrorPrisma {
  P2002 = 'P2002',
  P2003 = 'P2003'
}

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  catch(exception: any) {
    let customError: GraphQLError

    if (exception instanceof PrismaClientKnownRequestError) {
      const type = EErrorOrigin.Prisma
      const code = exception.code
      const meta = exception.meta
      const extensions = { type, code, meta }
      let message = 'Prisma unhandled error'

      if (code === EErrorPrisma.P2002)
        message = `${meta ? meta.target : 'Field'} is already taken.`
      if (code === EErrorPrisma.P2003)
        message = `The entity you are trying to reach doesn't exist.`
      else console.log(exception)
      customError = new GraphQLError(message, { extensions })
    } else if (exception instanceof ExceptionClassValidator) {
      const type = EErrorOrigin.ClassValidator
      const code = HttpStatus.I_AM_A_TEAPOT
      const meta = exception.getResponse()
      const extensions = { type, code, meta }
      const message = `Data isn't well formated`

      customError = new GraphQLError(message, { extensions })
    } else if (exception.status === HttpStatus.CONFLICT) {
      const type = EErrorOrigin.CustomException
      const code = HttpStatus.CONFLICT
      const meta = exception.getResponse()
      const extensions = { type, code, meta }
      const message = `Your data contains some conflict with our application`
      customError = new GraphQLError(message, { extensions })
    } else if (exception instanceof UnauthorizedException) {
      const type = EErrorOrigin.ServerError
      const code = HttpStatus.UNAUTHORIZED
      const meta = exception
      const extensions = { type, code, meta }
      const message = `You're not authorized to access this data`

      customError = new GraphQLError(message, { extensions })
    } else {
      // console.log(exception)
      customError = new GraphQLError('Unhandled error', exception)
    }

    return customError
  }
}
