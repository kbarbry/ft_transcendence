import { Module } from '@nestjs/common'
import { ChannelMessageService } from './channel-message.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  exports: [ChannelMessageService],
  providers: [ChannelMessageService]
})
export class ChannelMessageModule {}
