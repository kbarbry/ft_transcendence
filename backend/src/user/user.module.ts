import { Module } from '@nestjs/common'
import { UserService } from './user.service'

@Module({
  imports: [],
  exports: [UserService],
  providers: [UserService]
})
export class UserModule {}
