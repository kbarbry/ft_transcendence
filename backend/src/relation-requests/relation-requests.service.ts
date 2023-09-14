import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RelationRequests } from '@prisma/client'
import { RelationBlockedService } from 'src/relation-blocked/relation-blocked.service'

@Injectable()
export class RelationRequestsService {
  constructor(private prisma: PrismaService) {}

  @Inject(RelationBlockedService)
  private readonly relationBlockedService: RelationBlockedService

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(userAId: string, userBId: string): Promise<RelationRequests> {
    // A Blocked B
    // if (RelationBlockedService)
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
