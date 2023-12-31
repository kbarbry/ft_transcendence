import { Injectable } from '@nestjs/common'
import { RelationFriend } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { RelationFriendInput } from './dto/create-relation-friend.input'
@Injectable()
export class RelationFriendService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  async create(data: RelationFriendInput): Promise<RelationFriend> {
    if (data.userAId > data.userBId)
      [data.userAId, data.userBId] = [data.userBId, data.userAId]
    return this.prisma.relationFriend.create({
      data: {
        userAId: data.userAId,
        userBId: data.userBId
      }
    })
  }

  async delete(userAId: string, userBId: string): Promise<RelationFriend> {
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

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findAll(id: string): Promise<string[]> {
    const caseSender = (
      await this.prisma.relationFriend.findMany({
        where: {
          userAId: id
        },
        select: {
          userBId: true
        }
      })
    ).map((elem) => elem.userBId)

    const caseReceiver = (
      await this.prisma.relationFriend.findMany({
        where: {
          userBId: id
        },
        select: {
          userAId: true
        }
      })
    ).map((elem) => elem.userAId)
    return [...caseSender, ...caseReceiver]
  }

  async isFriend(userAId: string, userBId: string): Promise<boolean> {
    if (userAId > userBId) [userAId, userBId] = [userBId, userAId]
    const relation = await this.prisma.relationFriend.findUnique({
      where: {
        userAId_userBId: {
          userAId,
          userBId
        }
      }
    })
    return relation !== null
  }
}
