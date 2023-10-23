import { Catch, ArgumentsHost } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // const gqlHost = GqlArgumentsHost.create(host)
    // const context = gqlHost.getContext()
    let customError: GraphQLError

    if (exception instanceof PrismaClientKnownRequestError) {
      const code = exception.code
      const meta = exception.meta

      customError = new GraphQLError('An error occurred', {
        extensions: { code, meta }
      })
    } else {
      customError = new GraphQLError('Unhandled error')
    }

    return customError
  }
}
