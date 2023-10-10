import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserResolver } from './user.resolver'
import { User } from './entities/user.entity'

@Module({
  imports: [PrismaModule],
  exports: [UserService, User],
  providers: [UserService, UserResolver, User]
})
export class UserModule {}
