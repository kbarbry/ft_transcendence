import { Module } from '@nestjs/common'
import { ChannelBlockedService } from './channel-blocked.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ChannelBlockedResolver } from './channel-blocked.resolver'
import { ChannelBlocked } from './entities/channel-blocked.entity'

@Module({
  imports: [PrismaModule],
  exports: [ChannelBlockedService],
  providers: [ChannelBlockedService, ChannelBlockedResolver, ChannelBlocked]
})
export class ChannelBlockedModule {}
