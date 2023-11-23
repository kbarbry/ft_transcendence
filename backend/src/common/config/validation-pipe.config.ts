import { ValidationPipe } from '@nestjs/common'
import { ExceptionClassValidator } from '../exceptions/class-validator.exception'

export const validationPipeConfig = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (errors) => {
    const result = errors.map((error) => ({
      property: error.property,
      message: error.constraints
        ? error.constraints[Object.keys(error.constraints)[0]]
        : 'Unhandled error'
    }))
    return new ExceptionClassValidator(result)
  }
})
