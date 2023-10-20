import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { UserPresenceService } from './user-presence.service'
import { UserPresence } from './entities/user-presence.entity'
import { UserPresenceResolver } from './user-presence.resolver'

@Module({
  imports: [PrismaModule],
  exports: [UserPresenceService],
  providers: [UserPresenceService, UserPresenceResolver, UserPresence]
})
export class UserPresenceModule {}
