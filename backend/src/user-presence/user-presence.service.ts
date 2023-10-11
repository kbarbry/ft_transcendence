import { Injectable } from '@nestjs/common'
import { UserPresence } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { UserPresenceCreateInput } from './dto/create-user-presence.input'

@Injectable()
export class UserPresenceService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(data: UserPresenceCreateInput): Promise<UserPresence> {
    return this.prisma.userPresence.create({
      data
    })
  }

  async disconnected(id: string): Promise<UserPresence> {
    return this.prisma.userPresence.update({
      where: {
        id
      },
      data: {
        disconnectedAt: new Date()
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async isConnected(id: string): Promise<boolean> {
    const userPresence = await this.prisma.userPresence.findUnique({
      where: {
        id
      }
    })
    if (userPresence?.disconnectedAt) return false
    return true
  }

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
