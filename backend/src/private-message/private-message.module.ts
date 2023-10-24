import { Module } from '@nestjs/common'
import { PrivateMessageService } from './private-message.service'
import { PrismaModule } from '../prisma/prisma.module'
import { PrivateMessageResolver } from './private-message.resolver'
import { PrivateMessage } from './entities/private-message.entity'

@Module({
  imports: [PrismaModule],
  exports: [PrivateMessageService],
  providers: [PrivateMessageService, PrivateMessageResolver, PrivateMessage]
})
export class PrivateMessageModule {}
