import { Module } from '@nestjs/common'
import { RelationFriendService } from './relation-friend.service'

@Module({
  imports: [],
  exports: [RelationFriendService],
  providers: [RelationFriendService]
})
export class RelationFriendModule {}
