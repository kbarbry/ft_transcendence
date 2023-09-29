import { Inject, Injectable } from '@nestjs/common'
import { RelationBlocked } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'
import { RelationRequestsService } from '../relation-requests/relation-requests.service'
import {
  ExceptionAlreadyBlocked,
  ExceptionBlockedYourself
} from '../user/exceptions/blocked.exceptions'

@Injectable()
export class RelationBlockedService {
  constructor(private prisma: PrismaService) {}

  @Inject(RelationFriendService)
  private readonly relationFriendService: RelationFriendService

  @Inject(RelationRequestsService)
  private readonly relationRequestsService: RelationRequestsService

  //**************************************************//
  //  MUTATION
  //**************************************************//

  // async create(
  //   userAId: string,
  //   userBId: string
  // ): Promise<RelationBlocked | null> {
  //   if (userAId == userBId) throw new ExceptionBlockedYourself()
  //   const userAlreadyBlocked = await this.isBlocked(userAId, userBId)
  //   if (userAlreadyBlocked) {
  //     throw new ExceptionAlreadyBlocked()
  //   }
  //   return this.prisma.relationBlocked.create({
  //     data: {
  //       userBlockingId: userAId,
  //       userBlockedId: userBId
  //     }
  //   })
  // }
  async create(
    userAId: string,
    userBId: string
  ): Promise<RelationBlocked | null> {
    if (userAId == userBId) throw new ExceptionBlockedYourself()
    const userAlreadyBlocked = await this.isBlocked(userAId, userBId)
    if (userAlreadyBlocked) {
      throw new ExceptionAlreadyBlocked()
    }
    const BHasMadeRequest = await this.relationRequestsService.isRequested(
      userBId,
      userAId
    )
    if (BHasMadeRequest) {
      await this.relationRequestsService.delete(userBId, userAId)
    }
    const AHasMadeRequest = await this.relationRequestsService.isRequested(
      userAId,
      userBId
    )
    if (AHasMadeRequest) {
      await this.relationRequestsService.delete(userAId, userBId)
    }
    const BIsFriend = await this.relationFriendService.isFriend(
      userAId,
      userBId
    )
    if (BIsFriend) {
      await this.relationFriendService.delete(userAId, userBId)
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
