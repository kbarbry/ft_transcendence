import { Module } from '@nestjs/common'
import { PongGameResolver } from './pong-game.resolver'
import { PongGameService } from './pong-game.service'
import { GameStatService } from 'src/game-stat/game-stat.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  providers: [PongGameResolver, PongGameService, GameStatService, PrismaService]
})
export class PongGameModule {}
