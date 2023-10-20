import { Module } from '@nestjs/common'
import { ChannelInvitedService } from './channel-invited.service'
import { PrismaModule } from '../prisma/prisma.module'
import { ChannelInvitedResolver } from './channel-invited.resolver'
import { ChannelInvited } from './entities/channel-invited.entity'

@Module({
  imports: [PrismaModule],
  exports: [ChannelInvitedService],
  providers: [ChannelInvitedService, ChannelInvitedResolver, ChannelInvited]
})
export class ChannelInvitedModule {}
