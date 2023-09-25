import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { RelationRequests } from '@prisma/client'
import { RelationBlockedService } from '../relation-blocked/relation-blocked.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'
import {
  ExceptionUserBlocked,
  ExceptionUserBlockedYou
} from '../user/exceptions/blocked.exceptions'
import { ExceptionUsersAlreadyFriend } from '../user/exceptions/friend.exceptions'
import { ExceptionRequestAlreadySent } from '../user/exceptions/request.exceptions'

@Injectable()
export class RelationRequestsService {
  constructor(private prisma: PrismaService) {}

  @Inject(RelationBlockedService)
  private readonly relationBlockedService: RelationBlockedService

  @Inject(RelationFriendService)
  private readonly relationFriendService: RelationFriendService

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(
    userAId: string,
    userBId: string
  ): Promise<RelationRequests | null> {
    // if blocked
    if (await this.relationBlockedService.isBlocked(userAId, userBId))
      throw new ExceptionUserBlocked()
    // if blocked by the other user
    if (await this.relationBlockedService.isBlocked(userBId, userAId))
      throw new ExceptionUserBlockedYou()
    // if friend
    if (await this.relationFriendService.isFriend(userAId, userBId))
      throw new ExceptionUsersAlreadyFriend()
    if (await this.isRequested(userAId, userBId))
      throw new ExceptionRequestAlreadySent()
    // if no relations
    // if requestFriendSent
    // if requestFriendReceived
    // No relation
    return this.prisma.relationRequests.create({
      data: {
        userReceiverId: userAId,
        userSenderId: userBId
      }
    })
  }

  async delete(userAId: string, userBId: string): Promise<RelationRequests> {
    return this.prisma.relationRequests.delete({
      where: {
        userSenderId_userReceiverId: {
          userSenderId: userAId,
          userReceiverId: userBId
        }
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findOne(
    userAId: string,
    userBId: string
  ): Promise<RelationRequests | null> {
    return this.prisma.relationRequests.findUnique({
      where: {
        userSenderId_userReceiverId: {
          userSenderId: userAId,
          userReceiverId: userBId
        }
      }
    })
  }

  async isRequested(userAId: string, userBId: string): Promise<boolean> {
    if (
      this.prisma.relationRequests.findUnique({
        where: {
          userSenderId_userReceiverId: {
            userSenderId: userAId,
            userReceiverId: userBId
          }
        }
      }) !== null
    )
      return true
    return false
  }

  async findAllRequestSent(id: string): Promise<string[]> {
    return (
      await this.prisma.relationRequests.findMany({
        where: {
          userSenderId: id
        },
        select: {
          userReceiverId: true
        }
      })
    ).map((elem) => elem.userReceiverId)
  }

  async findAllRequestReceived(id: string): Promise<string[]> {
    return (
      await this.prisma.relationRequests.findMany({
        where: {
          userReceiverId: id
        },
        select: {
          userSenderId: true
        }
      })
    ).map((elem) => elem.userSenderId)
  }
}
