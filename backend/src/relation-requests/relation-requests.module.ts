import { Module } from '@nestjs/common'
import { RelationRequestsService } from './relation-requests.service'
import { RelationFriendModule } from '../relation-friend/relation-friend.module'
import { RelationBlockedModule } from '../relation-blocked/relation-blocked.module'
import { PrismaModule } from '../prisma/prisma.module'
import { RelationRequestsResolver } from './relation-requests.resolver'
import { RelationRequests } from './entities/relation-requests.entity'

@Module({
  imports: [RelationFriendModule, RelationBlockedModule, PrismaModule],
  exports: [RelationRequestsService],
  providers: [
    RelationRequestsService,
    RelationRequestsResolver,
    RelationRequests
  ]
})
export class RelationRequestsModule {}
