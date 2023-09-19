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
    userSenderId: string,
    userReceiverId: string
  ): Promise<RelationRequests | RelationFriend> {
    // if blocked
    console.log('EWE MON CON')
    if (
      await this.relationBlockedService.isBlocked(userSenderId, userReceiverId)
    )
      throw new ExceptionUserBlocked()
    // if blocked by the other user
    console.log('EWE MON CON 2')
    if (
      await this.relationBlockedService.isBlocked(userReceiverId, userSenderId)
    )
      throw new ExceptionUserBlockedYou()
    console.log('EWE MON CON 3')
    // if friend
    if (await this.relationFriendService.isFriend(userSenderId, userReceiverId))
      throw new ExceptionUsersAlreadyFriend()
    console.log('EWE MON CON 4')
    // if requestFriendSent
    if (await this.isRequested(userSenderId, userReceiverId)) {
      throw new ExceptionRequestAlreadySent()
    }
    console.log('EWE MON CON 5')
    // if requestFriendReceived
    if (await this.isRequested(userReceiverId, userSenderId)) {
      await this.delete(userReceiverId, userSenderId)
      return this.relationFriendService.create(userSenderId, userReceiverId)
    }
    console.log('EWE MON CON 6')
    // if no relations
    return this.prisma.relationRequests.create({
      data: {
        userSenderId,
        userReceiverId
      }
    })
  }

  async delete(
    userSenderId: string,
    userReceiverId: string
  ): Promise<RelationRequests> {
    return this.prisma.relationRequests.delete({
      where: {
        userSenderId_userReceiverId: {
          userSenderId,
          userReceiverId
        }
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findOne(
    userSenderId: string,
    userReceiverId: string
  ): Promise<RelationRequests | null> {
    return this.prisma.relationRequests.findUnique({
      where: {
        userSenderId_userReceiverId: {
          userSenderId,
          userReceiverId
        }
      }
    })
  }

  async isRequested(
    userSenderId: string,
    userReceiverId: string
  ): Promise<boolean> {
    const res = await this.findOne(userSenderId, userReceiverId)
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
