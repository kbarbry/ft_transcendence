import { Injectable } from '@nestjs/common'
import { RelationFriend } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class RelationFriendService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(userAId: string, userBId: string): Promise<RelationFriend> {
    // condition des blocked, c'est meetic genre
    if (userAId > userBId) [userAId, userBId] = [userBId, userAId]
    return this.prisma.relationFriend.create({
      data: {
        userAId,
        userBId
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findAll(id: string): Promise<string[]> {
    const caseSender = (
      await this.prisma.relationRequests.findMany({
        where: {
          userSenderId: id
        },
        select: {
          userReceiverId: true
        }
      })
    ).map((elem) => elem.userReceiverId)

    const caseReceiver = (
      await this.prisma.relationRequests.findMany({
        where: {
          userReceiverId: id
        },
        select: {
          userSenderId: true
        }
      })
    ).map((elem) => elem.userSenderId)
    return [...caseSender, ...caseReceiver]
  }

  async isFriend(userAId: string, userBId: string): Promise<boolean> {
    const relation = await this.prisma.relationFriend.findUnique({
      where: {
        userAId_userBId: {
          userAId,
          userBId
        }
      }
    })
    return !!relation
  }

  async findAllById(id: string): Promise<Array<string>> {
    const id_tab: Array<string> = []

    const dbreturn = await this.prisma.relationFriend.findMany({
      where: {
        OR: [
          {
            userAId: id
          },
          {
            userBId: id
          }
        ]
      }
    })

    for (const rel of dbreturn) {
      if (rel.userAId == id) {
        id_tab.push(rel.userBId)
      } else {
        id_tab.push(rel.userAId)
      }
    }

    return id_tab
  }

  async deleteById(userAId: string, userBId: string): Promise<RelationFriend> {
    if (userAId > userBId) [userAId, userBId] = [userBId, userAId]
    return this.prisma.relationFriend.delete({
      where: {
        userAId_userBId: {
          userAId,
          userBId
        }
      }
    })
  }
}
