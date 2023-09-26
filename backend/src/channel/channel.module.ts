import { Module } from '@nestjs/common'
import { ChannelService } from './channel.service'

@Module({
  imports: [],
  exports: [ChannelService],
  providers: [ChannelService]
})
export class ChannelModule {}
