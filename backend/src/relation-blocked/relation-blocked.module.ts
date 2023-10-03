import { Module } from '@nestjs/common'
import { RelationBlockedService } from './relation-blocked.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  exports: [RelationBlockedService],
  providers: [RelationBlockedService]
})
export class RelationBlockedModule {}
