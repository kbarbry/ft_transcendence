import { Module } from '@nestjs/common'
import { ChannelBlockedService } from './channel-blocked.service'

@Module({
  imports: [],
  exports: [ChannelBlockedService],
  providers: [ChannelBlockedService]
})
export class ChannelBlockedModule {}
