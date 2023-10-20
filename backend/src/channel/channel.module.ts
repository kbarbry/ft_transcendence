import { Module } from '@nestjs/common'
import { ChannelService } from './channel.service'
import { PrismaModule } from '../prisma/prisma.module'
import { ChannelResolver } from './channel.resolver'
import { Channel } from './entities/channel.entity'

@Module({
  imports: [PrismaModule],
  exports: [ChannelService],
  providers: [ChannelService, ChannelResolver, Channel]
})
export class ChannelModule {}
