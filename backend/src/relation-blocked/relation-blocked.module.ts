import { Module } from '@nestjs/common'
import { RelationBlockedService } from './relation-blocked.service'

@Module({
  imports: [],
  exports: [RelationBlockedService],
  providers: [RelationBlockedService]
})
export class RelationBlockedModule {}
