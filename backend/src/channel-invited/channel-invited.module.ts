import { Module } from '@nestjs/common'
import { ChannelInvitedService } from './channel-invited.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ChannelInvitedResolver } from './channel-invited.resolver';

@Module({
  imports: [PrismaModule],
  exports: [ChannelInvitedService],
  providers: [ChannelInvitedService, ChannelInvitedResolver]
})
export class ChannelInvitedModule {}
