import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { GlobalExceptionFilter } from './common/filters/general.filter'
import { ExceptionClassValidator } from './common/exceptions/class-validator.exception'
import { randomBytes } from 'crypto'
import session from 'express-session'
import passport from 'passport'
import favicon from 'serve-favicon'
import path from 'path'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // const cors = require("cors");
  // app.use(cors({
  //   origin: "http://localhost:5173",
  //   methods: ["GET", "POST"]
  // }));
const cors = require('cors');

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Remplacez par l'URL de votre application front-end
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204, // Pour les demandes OPTIONS
};

app.use(cors(corsOptions));
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
      secret: randomBytes(16).toString('hex'),
      saveUninitialized: false,
      resave: false,
      name: 'trans_session',
      rolling: true,
      unset: 'destroy',
      cookie: {
        httpOnly: true,
        maxAge: 60000,
        sameSite: 'strict',
        signed: true
      }
    })
  )
  app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000)
}
bootstrap()
