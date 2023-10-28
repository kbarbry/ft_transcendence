import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { GlobalExceptionFilter } from './common/filters/general.filter'
import { ExceptionClassValidator } from './common/exceptions/class-validator.exception'
import * as session from 'express-session'

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
  app.setGlobalPrefix('api')
  app.use(
    session({
      secret:
        'jQ{%8(NqC|L4:qi7d67M7D6$994WQM>S412+k<L(Pi.V=[--IZ=ECj@xZ$00#F!n',
      saveUninitialized: false,
      resave: false,
      cookie: { httpOnly: true, maxAge: 60000 }
    })
  )
  await app.listen(3000)
}
bootstrap()
