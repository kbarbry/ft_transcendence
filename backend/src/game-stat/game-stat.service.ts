import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, GameStat, EGameType } from '@prisma/client'

@Injectable()
export class GameStatService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.GameStatCreateInput): Promise<GameStat> {
    return this.prisma.gameStat.create({
      data
    })
  }

  async update(
    id: string,
    data: Prisma.GameStatUpdateInput
  ): Promise<GameStat> {
    return this.prisma.gameStat.update({
      where: {
        id
      },
      data
    })
  }

  async delete(id: string): Promise<GameStat> {
    return this.prisma.gameStat.delete({
      where: {
        id
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  // Find a GameStat with an GameStat ID \\
  async findOne(id: string): Promise<GameStat | null> {
    return this.prisma.gameStat.findUnique({
      where: {
        id
      }
    })
  }

  //Find all GameStat with an User ID\\
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

  //Find all win GameStat with an User ID\\
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

  //Find all loose GameStat with an User ID\\
  async findLoose(id: string): Promise<GameStat[]> {
    return this.prisma.gameStat.findMany({
      where: {
        looserId: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  //Find all classics GameStat with an User ID\\
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

  //Find all special GameStat with an User ID\\
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
