import { Injectable } from '@nestjs/common'
import { RelationBlocked } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import {
  ExceptionAlreadyBlocked,
  ExceptionBlockedYourself
} from '../user/exceptions/blocked.exceptions'

@Injectable()
export class RelationBlockedService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(
    userAId: string,
    userBId: string
  ): Promise<RelationBlocked | null> {
    if (userAId == userBId) throw new ExceptionBlockedYourself()
    const userAlreadyBlocked = await this.isBlocked(userAId, userBId)
    if (userAlreadyBlocked) {
      throw new ExceptionAlreadyBlocked()
    }
    return this.prisma.relationBlocked.create({
      data: {
        userBlockingId: userAId,
        userBlockedId: userBId
      }
    })
  }

  async delete(userAId: string, userBId: string) {
    return await this.prisma.relationBlocked.delete({
      where: {
        userBlockingId_userBlockedId: {
          userBlockingId: userAId,
          userBlockedId: userBId
        }
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async isBlocked(userAId: string, userBId: string): Promise<boolean> {
    const relation = await this.prisma.relationBlocked.findUnique({
      where: {
        userBlockingId_userBlockedId: {
          userBlockingId: userAId,
          userBlockedId: userBId
        }
      }
    })
    return relation !== null
  }

  async findAllBlockedByUser(id: string): Promise<string[]> {
    return (
      await this.prisma.relationBlocked.findMany({
        where: {
          userBlockingId: id
        },
        select: {
          userBlockedId: true
        }
      })
    ).map((elem) => elem.userBlockedId)
  }
}
