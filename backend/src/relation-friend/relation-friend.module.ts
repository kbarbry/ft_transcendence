import { Module } from '@nestjs/common'
import { RelationFriendService } from './relation-friend.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { RelationFriendResolver } from './relation-friend.resolver'
import { RelationFriend } from './entities/relation-friend.entity'

@Module({
  imports: [PrismaModule],
  exports: [RelationFriendService],
  providers: [RelationFriendService, RelationFriendResolver, RelationFriend]
})
export class RelationFriendModule {}
