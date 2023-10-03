import { Module } from '@nestjs/common'
import { GameStatService } from './game-stat.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  exports: [GameStatService],
  providers: [GameStatService]
})
export class GameStatModule {}
