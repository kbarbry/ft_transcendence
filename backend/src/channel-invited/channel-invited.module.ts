import { Module } from '@nestjs/common'
import { ChannelInvitedService } from './channel-invited.service'

@Module({
  imports: [],
  exports: [ChannelInvitedService],
  providers: [ChannelInvitedService]
})
export class ChannelInvitedModule {}
