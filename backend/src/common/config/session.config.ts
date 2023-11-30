import { randomBytes } from 'crypto'
import session from 'express-session'

export const sessionConfig = session({
  secret: randomBytes(16).toString('hex'),
  saveUninitialized: false,
  resave: false,
  name: 'trans_session',
  rolling: true,
  unset: 'destroy',
  cookie: {
    sameSite: 'lax',
    httpOnly: true, //todo set true
    maxAge: 60000,
    secure: 'auto',
    signed: true,
    path: '/'
  }
})
