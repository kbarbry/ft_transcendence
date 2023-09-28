import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, GameStat, EGameType } from '@prisma/client'
import {
  ExceptionTryingToUpdateID,
  ExceptionSamePlayerInGame
} from '../user/exceptions/game-stat.exception'

@Injectable()
export class GameStatService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.GameStatCreateInput): Promise<GameStat> {
    if (data.looser?.connect?.id === data.winner?.connect?.id) {
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
        OR: [{ winnerId: id }, { looserId: id }]
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
        looserId: id
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
          { looserId: id, type: EGameType.Classic }
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
          { looserId: id, type: EGameType.Special }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
