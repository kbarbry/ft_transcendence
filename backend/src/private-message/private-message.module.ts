import { Module } from '@nestjs/common'
import { PrivateMessageService } from './private-message.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  exports: [PrivateMessageService],
  providers: [PrivateMessageService]
})
export class PrivateMessageModule {}
