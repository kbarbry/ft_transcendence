import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserPresenceService } from './user-presence.service'
import { UserPresence } from './entities/user-presence.entity'
import { UserPresenceResolver } from './user-presence.resolver'

@Module({
  imports: [PrismaModule],
  exports: [UserPresenceService, UserPresence],
  providers: [UserPresenceService, UserPresenceResolver]
})
export class UserPresenceModule {}
