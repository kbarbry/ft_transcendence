import { Module } from '@nestjs/common'
import { ChannelBlockedService } from './channel-blocked.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  exports: [ChannelBlockedService],
  providers: [ChannelBlockedService]
})
export class ChannelBlockedModule {}
