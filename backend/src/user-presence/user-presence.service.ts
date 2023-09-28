import { Injectable } from '@nestjs/common'
import { Prisma, UserPresence } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserPresenceService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(data: Prisma.UserPresenceCreateInput): Promise<UserPresence> {
    return this.prisma.userPresence.create({
      data
    })
  }

  async disconnected(id: string, disconnectedAt: Date): Promise<UserPresence> {
    return this.prisma.userPresence.update({
      where: {
        id
      },
      data: {
        disconnectedAt
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findOne(id: string): Promise<UserPresence | null> {
    return this.prisma.userPresence.findUnique({
      where: {
        id
      }
    })
  }

  async findLastByUserId(userId: string): Promise<UserPresence | null> {
    return this.prisma.userPresence.findFirst({
      where: {
        userId
      },
      orderBy: {
        connectedAt: 'desc'
      }
    })
  }

  async findAllByUserId(userId: string): Promise<UserPresence[]> {
    return this.prisma.userPresence.findMany({
      where: {
        userId
      },
      orderBy: {
        connectedAt: 'desc'
      }
    })
  }
}
