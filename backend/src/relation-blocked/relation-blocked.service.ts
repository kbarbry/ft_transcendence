import { Injectable } from '@nestjs/common'
import { RelationBlocked } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { ExceptionAlreadyBlocked } from '../user/exceptions/blocked.exceptions'

@Injectable()
export class RelationBlockedService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  //A block B
  async create(
    userAId: string,
    userBId: string
  ): Promise<RelationBlocked | null> {
    // if no relations
    // if already blocked
    // if blocked by the other user
    // if friend
    // if requestFriendSent
    // if requestFriendReceived
    if (await this.isBlocked(userAId, userBId))
      throw new ExceptionAlreadyBlocked()
    return this.prisma.relationBlocked.create({
      data: {
        userBlockingId: userAId,
        userBlockedId: userBId
      }
    })
  }

  //A unlock B
  async delete(userAId: string, userBId: string) {
    if (await this.isBlocked(userAId, userBId)) {
      return await this.prisma.relationBlocked.delete({
        where: {
          userBlockingId_userBlockedId: {
            userBlockingId: userAId,
            userBlockedId: userBId
          }
        }
      })
    }
    //Pas de return, donc la fonction renvoie 'undefined' si 'isBlocked'
    //est évalué à 'false'..
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  // A blocked by B?
  async isBlocked(userAId: string, userBId: string): Promise<boolean> {
    const relation = await this.prisma.relationBlocked.findUnique({
      where: {
        userBlockingId_userBlockedId: {
          userBlockingId: userAId,
          userBlockedId: userBId
        }
      }
    })
    return !!relation
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

  async findAllBlockingByUser(id: string): Promise<string[]> {
    return (
      await this.prisma.relationBlocked.findMany({
        where: {
          userBlockedId: id
        },
        select: {
          userBlockingId: true
        }
      })
    ).map((elem) => elem.userBlockingId)
  }
}
