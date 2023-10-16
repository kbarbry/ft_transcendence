import { Module } from '@nestjs/common'
import { GameStatService } from './game-stat.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { GameStat } from './entities/game-stat.entity'
import { GameStatResolver } from './game-stat.resolver'

@Module({
  imports: [PrismaModule],
  exports: [GameStatService],
  providers: [GameStatService, GameStatResolver, GameStat]
})
export class GameStatModule {}
