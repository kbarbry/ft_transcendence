import { Module } from '@nestjs/common'
import { ChannelService } from './channel.service'
import { UserService } from '../user/user.service'

@Module({
  imports: [UserService],
  exports: [ChannelService],
  providers: [ChannelService]
})
export class ChannelModule {}
