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
  async create(userA: string, userB: string): Promise<RelationBlocked> {
    return this.prisma.relationBlocked.create({
      data: {
        userBlockingId: userA,
        userBlockedId: userB
      }
    })
  }

  //A unblock B     ==> delete or update gor name?
  async delete(userId1: string, userId2: string) {
    const updatedRelation = await this.prisma.relationBlocked.delete({
      where: {
        userBlockingId_userBlockedId: {
          userBlockingId: userId1,
          userBlockedId: userId2
        }
      }
    })
    return updatedRelation
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  //A blocked by B?
  async isUserBlocked(userAId: string, userBId: string): Promise<boolean> {
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

  // async isUserBlockedByChan(userId: string, chanId: string): Promise<boolean> {
  //==>Enum EMemberType()
  // }
}
