import {
  Catch,
  HttpStatus,
  ExecutionContext,
  ArgumentsHost,
  ExceptionFilter,
  HttpException
} from '@nestjs/common'
import {
  GqlArgumentsHost,
  GqlExceptionFilter,
  GqlExecutionContext
} from '@nestjs/graphql'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Request, Response } from 'express'

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    // const status = exception.getStatus()
    // const { req } = GqlArgumentsHost.create(host).getContext()
    // return req ? createRequestData(req) : null
    // const response = host.switchToHttp().getResponse()
    // const request = context.req
    // const response = context.res

    console.log('request LALALALA')
    console.log(response)
    // console.log('response LALALALA')
    // console.log(response)
    // Handle the Prisma known request error as a GraphQL response

    // response.status(HttpStatus.BAD_REQUEST).json({
    //   statusCode: HttpStatus.BAD_REQUEST,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    //   message: 'Prisma known request error: ' + exception.message
    // })
  }
}
