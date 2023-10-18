import { Module } from '@nestjs/common'
import { RelationBlockedService } from './relation-blocked.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { RelationBlocked } from './entities/relation-blocked.entity'
import { RelationBlockedResolver } from './relation-blocked.resolver'

@Module({
  imports: [PrismaModule],
  exports: [RelationBlockedService],
  providers: [RelationBlockedService, RelationBlocked, RelationBlockedResolver]
})
export class RelationBlockedModule {}
