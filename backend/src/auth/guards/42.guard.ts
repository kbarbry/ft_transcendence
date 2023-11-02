import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class School42AuthGuard extends AuthGuard('42') {}
