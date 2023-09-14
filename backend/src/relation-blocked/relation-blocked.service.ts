import { Injectable } from '@nestjs/common'
import { RelationBlocked } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RelationBlockedService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  //A block B
  async create(userAId: string, userBId: string): Promise<RelationBlocked | null> {
    if (!(await this.isBlocked(userAId, userBId))) {
      return this.prisma.relationBlocked.create({
        data: {
          userBlockingId: userAId,
          userBlockedId: userBId
        }
      });
    } else {
      return Promise.resolve(null);
    }
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
