import { Module } from '@nestjs/common'
import { RelationFriendService } from './relation-friend.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  exports: [RelationFriendService],
  providers: [RelationFriendService]
})
export class RelationFriendModule {}
