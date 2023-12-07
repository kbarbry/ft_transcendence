import { Module } from '@nestjs/common'
import { PongGameResolver } from './pong-game.resolver'
import { PongGameService } from './pong-game.service'

@Module({
  providers: [PongGameResolver, PongGameService]
})
export class PongGameModule {}
