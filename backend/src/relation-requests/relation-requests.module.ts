import { Module } from '@nestjs/common'
import { RelationRequestsService } from './relation-requests.service'
import { RelationFriendModule } from '../relation-friend/relation-friend.module'
import { RelationBlockedModule } from '../relation-blocked/relation-blocked.module'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [RelationFriendModule, RelationBlockedModule, PrismaModule],
  exports: [RelationRequestsService],
  providers: [RelationRequestsService]
})
export class RelationRequestsModule {}
