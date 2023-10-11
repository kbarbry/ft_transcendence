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
import { ExceptionRequestingYourself } from '../user/exceptions/request.exceptions'

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
    const userFriend = await this.relationFriendService.isFriend(
      userSenderId,
      userReceiverId
    )
    const userBlocked = await this.relationBlockedService.isBlocked(
      userSenderId,
      userReceiverId
    )
    const userBlockedYou = await this.relationBlockedService.isBlocked(
      userReceiverId,
      userSenderId
    )
    const userRequestReceived = await this.isRequested(
      userReceiverId,
      userSenderId
    )
    if (userSenderId === userReceiverId) {
      throw new ExceptionRequestingYourself()
    }

    if (userBlocked) {
      throw new ExceptionUserBlocked()
    }

    if (userBlockedYou) {
      throw new ExceptionUserBlockedYou()
    }

    if (userFriend) {
      throw new ExceptionUsersAlreadyFriend()
    }

    if (userRequestReceived) {
      await this.delete(userReceiverId, userSenderId)
      return this.relationFriendService.create(userSenderId, userReceiverId)
    }

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
        },
        orderBy: {
          userReceiverId: 'asc'
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
        },
        orderBy: {
          userReceiverId: 'desc'
        }
      })
    ).map((elem) => elem.userSenderId)
  }
}
