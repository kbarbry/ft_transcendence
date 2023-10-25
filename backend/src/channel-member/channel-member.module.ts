import { Module } from '@nestjs/common'
import { ChannelMemberService } from './channel-member.service'
import { ChannelBlockedModule } from '../channel-blocked/channel-blocked.module'
import { ChannelInvitedModule } from '../channel-invited/channel-invited.module'
import { ChannelModule } from '../channel/channel.module'
import { PrismaModule } from '../prisma/prisma.module'
import { ChannelMemberResolver } from './channel-member.resolver'
import { ChannelMember } from './entities/channel-member.entity'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    ChannelBlockedModule,
    ChannelInvitedModule,
    ChannelModule,
    UserModule,
    PrismaModule
  ],
  exports: [ChannelMemberService],
  providers: [ChannelMemberService, ChannelMemberResolver, ChannelMember]
})
export class ChannelMemberModule {}
