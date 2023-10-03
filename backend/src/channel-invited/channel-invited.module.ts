import { Module } from '@nestjs/common'
import { ChannelInvitedService } from './channel-invited.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  exports: [ChannelInvitedService],
  providers: [ChannelInvitedService]
})
export class ChannelInvitedModule {}
