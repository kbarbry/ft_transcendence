import { Module } from '@nestjs/common'
import { ChannelMessageService } from './channel-message.service'
import { PrismaModule } from '../prisma/prisma.module'
import { ChannelMessageResolver } from './channel-message.resolver'
import { ChannelMessage } from './entities/channel-message.entity'

@Module({
  imports: [PrismaModule],
  exports: [ChannelMessageService],
  providers: [ChannelMessageService, ChannelMessageResolver, ChannelMessage]
})
export class ChannelMessageModule {}
