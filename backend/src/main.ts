import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './common/filters/general.filter'
import passport from 'passport'
import favicon from 'serve-favicon'
import path from 'path'
import { validationPipeConfig } from './common/config/validation-pipe.config'
import { sessionConfig } from './common/config/session.config'
import { corsConfig } from './common/config/cors.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)


  
  app.enableCors(corsConfig)
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalPipes(validationPipeConfig)
  app.setGlobalPrefix('api')
  app.use(sessionConfig)
  app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000)
}
bootstrap()
