import { Module } from '@nestjs/common'
import { ChannelMemberService } from './channel-member.service'
import { ChannelBlockedModule } from '../channel-blocked/channel-blocked.module'
import { ChannelInvitedModule } from '../channel-invited/channel-invited.module'
import { ChannelModule } from '../channel/channel.module'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [
    ChannelBlockedModule,
    ChannelInvitedModule,
    ChannelModule,
    PrismaModule
  ],
  exports: [ChannelMemberService],
  providers: [ChannelMemberService]
})
export class ChannelMemberModule {}
