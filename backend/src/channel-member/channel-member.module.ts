import { Module } from '@nestjs/common'
import { ChannelMemberService } from './channel-member.service'
import { ChannelBlockedModule } from '../channel-blocked/channel-blocked.module'
import { ChannelInvitedModule } from '../channel-invited/channel-invited.module'
import { ChannelModule } from '../channel/channel.module'

@Module({
  imports: [ChannelBlockedModule, ChannelInvitedModule, ChannelModule],
  exports: [ChannelMemberService],
  providers: [ChannelMemberService]
})
export class ChannelMemberModule {}
