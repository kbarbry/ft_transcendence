import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { RelationBlocked } from '@prisma/client'
import {
  ExceptionAlreadyBlocked,
  ExceptionBlockedYourself
} from '../user/exceptions/blocked.exceptions'
import { RelationBlockedInput } from './dto/create-relation-blocked.input'

@Injectable()
export class RelationBlockedService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: RelationBlockedInput): Promise<RelationBlocked> {
    if (data.userBlockingId === data.userBlockedId)
      throw new ExceptionBlockedYourself()
    const userAlreadyBlocked = await this.isBlocked(
      data.userBlockingId,
      data.userBlockedId
    )
    if (userAlreadyBlocked) {
      throw new ExceptionAlreadyBlocked()
    }
    const BHasMadeRequest = await this.prisma.relationRequests.findUnique({
      where: {
        userSenderId_userReceiverId: {
          userSenderId: data.userBlockedId,
          userReceiverId: data.userBlockingId
        }
      }
    })
    if (BHasMadeRequest) {
      await this.prisma.relationRequests.delete({
        where: {
          userSenderId_userReceiverId: {
            userSenderId: data.userBlockedId,
            userReceiverId: data.userBlockingId
          }
        }
      })
    }

    const AHasMadeRequest = await this.prisma.relationRequests.findUnique({
      where: {
        userSenderId_userReceiverId: {
          userSenderId: data.userBlockingId,
          userReceiverId: data.userBlockedId
        }
      }
    })
    if (AHasMadeRequest) {
      await this.prisma.relationRequests.delete({
        where: {
          userSenderId_userReceiverId: {
            userSenderId: data.userBlockingId,
            userReceiverId: data.userBlockedId
          }
        }
      })
    }

    const IsFriend = await this.prisma.relationFriend.findUnique({
      where: {
        userAId_userBId: {
          userAId: data.userBlockingId,
          userBId: data.userBlockedId
        }
      }
    })
    if (IsFriend) {
      await this.prisma.relationFriend.delete({
        where: {
          userAId_userBId: {
            userAId: data.userBlockingId,
            userBId: data.userBlockedId
          }
        }
      })
    }
    return this.prisma.relationBlocked.create({
      data: {
        userBlockingId: data.userBlockingId,
        userBlockedId: data.userBlockedId
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
