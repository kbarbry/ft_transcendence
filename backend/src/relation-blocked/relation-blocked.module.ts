import { Module } from '@nestjs/common'
import { RelationBlockedService } from './relation-blocked.service'
import { RelationRequestsModule } from '../relation-requests/relation-requests.module'
import { RelationFriendModule } from '../relation-friend/relation-friend.module'

@Module({
  imports: [RelationFriendModule, RelationRequestsModule],
  exports: [RelationBlockedService],
  providers: [RelationBlockedService]
})
export class RelationBlockedModule {}
