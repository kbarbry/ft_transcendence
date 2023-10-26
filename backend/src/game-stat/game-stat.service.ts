import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { GameStat, EGameType } from '@prisma/client'
import { CreateGameStatInput } from './dto/create-game-stat.input'
import { ExceptionSamePlayerInGame } from '../user/exceptions/game-stat.exception'

@Injectable()
export class GameStatService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: CreateGameStatInput): Promise<GameStat> {
    if (data.loserId === data.winnerId) {
      throw new ExceptionSamePlayerInGame()
    }
    return this.prisma.gameStat.create({
      data
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findOne(id: string): Promise<GameStat | null> {
    return this.prisma.gameStat.findUnique({
      where: {
        id
      }
    })
  }

  async findAll(id: string): Promise<GameStat[]> {
    return this.prisma.gameStat.findMany({
      where: {
        OR: [{ winnerId: id }, { loserId: id }]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findWin(id: string): Promise<GameStat[]> {
    return this.prisma.gameStat.findMany({
      where: {
        winnerId: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findLose(id: string): Promise<GameStat[]> {
    return this.prisma.gameStat.findMany({
      where: {
        loserId: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findClassic(id: string): Promise<GameStat[]> {
    return this.prisma.gameStat.findMany({
      where: {
        OR: [
          { winnerId: id, type: EGameType.Classic },
          { loserId: id, type: EGameType.Classic }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findSpecial(id: string): Promise<GameStat[]> {
    return this.prisma.gameStat.findMany({
      where: {
        OR: [
          { winnerId: id, type: EGameType.Special },
          { loserId: id, type: EGameType.Special }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
