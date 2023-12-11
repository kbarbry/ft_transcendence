import { Module } from '@nestjs/common'
import { PongGameResolver } from './pong-game.resolver'
import { PongGameService } from './pong-game.service'
import { GameStatService } from 'src/game-stat/game-stat.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service'

@Module({
  providers: [
    PongGameResolver,
    PongGameService,
    GameStatService,
    UserService,
    PrismaService
  ]
})
export class PongGameModule {}
