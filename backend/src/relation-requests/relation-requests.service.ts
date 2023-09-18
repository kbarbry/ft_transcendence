import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { RelationFriend, RelationRequests } from '@prisma/client'
import { RelationBlockedService } from '../relation-blocked/relation-blocked.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'
import {
  ExceptionUserBlocked,
  ExceptionUserBlockedYou
} from '../user/exceptions/blocked.exceptions'
import { ExceptionUsersAlreadyFriend } from '../user/exceptions/friend.exceptions'
import { ExceptionRequestAlreadySent } from '../user/exceptions/request.exceptions'

// if blocked
// if blocked by the other user
// if friend
// if requestFriendSent
// if requestFriendReceived
// if no relations

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
  ): Promise<RelationRequests | RelationFriend> {
    // if blocked
    if (await this.relationBlockedService.isBlocked(userAId, userBId))
      throw new ExceptionUserBlocked()
    // if blocked by the other user
    if (await this.relationBlockedService.isBlocked(userBId, userAId))
      throw new ExceptionUserBlockedYou()
    // if friend
    if (await this.relationFriendService.isFriend(userAId, userBId))
      throw new ExceptionUsersAlreadyFriend()
    // if requestFriendSent
    console.log('Before request sent')
    const res = await this.isRequested(userAId, userBId)
    console.log('RETURN RES VALUE:', res)
    if (res === true) {
      console.log('RETURN TRUE')
      throw new ExceptionRequestAlreadySent()
    }
    console.log('After request sent')
    // if requestFriendReceived
    if (await this.isRequested(userBId, userAId)) {
      await this.delete(userBId, userAId)
      return this.relationFriendService.create(userAId, userBId)
    }
    // if no relations
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
    const res = await this.findOne(userAId, userBId)
    console.log('DEDANS')
    return res !== null
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
