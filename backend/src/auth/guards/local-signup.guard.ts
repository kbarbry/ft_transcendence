import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalSignUpAuthGuard extends AuthGuard('local-signup') {}
