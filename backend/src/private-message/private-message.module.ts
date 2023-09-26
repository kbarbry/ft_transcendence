import { Module } from '@nestjs/common'
import { PrivateMessageService } from './private-message.service'

@Module({
  imports: [],
  exports: [PrivateMessageService],
  providers: [PrivateMessageService]
})
export class PrivateMessageModule {}
