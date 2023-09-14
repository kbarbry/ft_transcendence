import { Module } from '@nestjs/common'
import { RelationRequestsService } from './relation-requests.service'
import { RelationFriendModule } from 'src/relation-friend/relation-friend.module'
import { RelationBlockedModule } from 'src/relation-blocked/relation-blocked.module'

@Module({
  imports: [RelationFriendModule, RelationBlockedModule],
  exports: [RelationRequestsService],
  providers: [RelationRequestsService]
})
export class RelationRequestsModule {}
