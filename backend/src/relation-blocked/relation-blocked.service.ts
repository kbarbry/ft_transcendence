import { Injectable } from '@nestjs/common'
import { RelationBlocked } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RelationBlockedService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(userA: string, userB: string): Promise<RelationBlocked> {
    return this.prisma.relationBlocked.create({
      data: {
        userBlockingId: userA,
        userBlockedId: userB
      }
    })
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

  //   async blockedByChan
}
