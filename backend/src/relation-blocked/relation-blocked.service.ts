import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { RelationBlocked } from '@prisma/client'
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
    const BHasMadeRequest = await this.prisma.relationRequests.findUnique({
      where: {
        userSenderId_userReceiverId: {
          userSenderId: userBId,
          userReceiverId: userAId
        }
      }
    })
    if (BHasMadeRequest) {
      await this.prisma.relationRequests.delete({
        where: {
          userSenderId_userReceiverId: {
            userSenderId: userBId,
            userReceiverId: userAId
          }
        }
      })
    }
    const AHasMadeRequest = await this.prisma.relationRequests.findUnique({
      where: {
        userSenderId_userReceiverId: {
          userSenderId: userAId,
          userReceiverId: userBId
        }
      }
    })
    if (AHasMadeRequest) {
      await this.prisma.relationRequests.delete({
        where: {
          userSenderId_userReceiverId: {
            userSenderId: userAId,
            userReceiverId: userBId
          }
        }
      })
    }

    const BIsFriend = await this.prisma.relationFriend.findUnique({
      where: {
        userAId_userBId: {
          userAId,
          userBId
        }
      }
    })
    if (BIsFriend) {
      await this.prisma.relationFriend.delete({
        where: {
          userAId_userBId: {
            userAId,
            userBId
          }
        }
      })
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
