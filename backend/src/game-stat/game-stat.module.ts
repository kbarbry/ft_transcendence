import { Module } from '@nestjs/common'
import { GameStatService } from './game-stat.service'

@Module({
  imports: [],
  exports: [GameStatService],
  providers: [GameStatService]
})
export class GameStatModule {}
