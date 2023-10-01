import { Module } from '@nestjs/common'
import { ChannelMemberService } from './channel-member.service'
import { ChannelBlockedModule } from '../channel-blocked/channel-blocked.module'
import { ChannelInvitedModule } from '../channel-invited/channel-invited.module'

@Module({
  imports: [ChannelBlockedModule, ChannelInvitedModule],
  exports: [ChannelMemberService],
  providers: [ChannelMemberService]
})
export class ChannelMemberModule {}
