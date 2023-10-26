import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { GlobalExceptionFilter } from './common/filters/general.filter'
import { ExceptionClassValidator } from './common/exceptions/class-validator.exception'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
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
  )
  await app.listen(3000)
}
bootstrap()
