import { Module } from '@nestjs/common'
import { ChannelMessageService } from './channel-message.service'

@Module({
  imports: [],
  exports: [ChannelMessageService],
  providers: [ChannelMessageService]
})
export class ChannelMessageModule {}
