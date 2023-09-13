import { Injectable } from '@nestjs/common'
import { Prisma, UserPresence } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

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

  async update(
    id: string,
    data: Prisma.UserPresenceUpdateInput
  ): Promise<UserPresence> {
    return this.prisma.userPresence.update({
      where: {
        id
      },
      data
    })
  }

  async delete(id: string): Promise<UserPresence> {
    return this.prisma.userPresence.delete({
      where: {
        id
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

  async findOnebyUserId(userId: string): Promise<UserPresence | null> {
    return this.prisma.userPresence.findFirst({
      where: {
        userId
      },
      orderBy: {
        connectedAt: 'desc'
      }
    })
  }

  async findAll(): Promise<UserPresence[]> {
    return this.prisma.userPresence.findMany()
  }
  // chercher par ID pour chercher un tableau d'Userpresence
}
