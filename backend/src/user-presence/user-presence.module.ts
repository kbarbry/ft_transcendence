import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserPresenceService } from './user-presence.service'

@Module({
  imports: [PrismaModule],
  exports: [UserPresenceService],
  providers: [UserPresenceService]
})
export class UserPresenceModule {}
