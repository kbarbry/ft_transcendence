import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RelationRequests } from '@prisma/client'

@Injectable()
export class RelationRequestsService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(idA: string, idB: string): Promise<RelationRequests> {
    if (idA > idB) [idA, idB] = [idB, idA]
    return this.prisma.relationRequests.create({
      data: {
        userReceiverId: idA,
        userSenderId: idB
      }
    })
  }

  async delete(idA: string, idB: string): Promise<RelationRequests> {
    if (idA > idB) [idA, idB] = [idB, idA]
    return this.prisma.relationRequests.delete({
      where: {
        userSenderId_userReceiverId: {
          userSenderId: idA,
          userReceiverId: idB
        }
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findOne(idA: string, idB: string): Promise<RelationRequests | null> {
    if (idA > idB) [idA, idB] = [idB, idA]
    return this.prisma.relationRequests.findUnique({
      where: {
        userSenderId_userReceiverId: {
          userSenderId: idA,
          userReceiverId: idB
        }
      }
    })
  }

  async isExisting(idA: string, idB: string): Promise<boolean> {
    if (idA > idB) [idA, idB] = [idB, idA]
    if (
      this.prisma.relationRequests.findUnique({
        where: {
          userSenderId_userReceiverId: {
            userSenderId: idA,
            userReceiverId: idB
          }
        }
      }) !== null
    )
      return true
    return false
  }

  async findAll(id: string): Promise<string[]> {
    const caseSender = (
      await this.prisma.relationRequests.findMany({
        where: {
          userSenderId: id
        },
        select: {
          userReceiverId: true
        }
      })
    ).map((elem) => elem.userReceiverId)
    const caseReceiver = (
      await this.prisma.relationRequests.findMany({
        where: {
          userReceiverId: id
        },
        select: {
          userSenderId: true
        }
      })
    ).map((elem) => elem.userSenderId)
    return [...caseSender, ...caseReceiver]
  }
}
