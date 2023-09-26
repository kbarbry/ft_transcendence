import { Module } from '@nestjs/common'
import { ChannelMemberService } from './channel-member.service'

@Module({
  imports: [],
  exports: [ChannelMemberService],
  providers: [ChannelMemberService]
})
export class ChannelMemberModule {}
