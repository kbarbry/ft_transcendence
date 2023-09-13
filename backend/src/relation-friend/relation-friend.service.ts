import { Injectable } from '@nestjs/common'
import { Prisma, RelationFriend } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RelationFriendService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.RelationFriendCreateInput
  ): Promise<RelationFriend> {
    return this.prisma.relationFriend.create({
      data
    })
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

  // async deleteById(idA: string, idB: string): Promise<RelationFriend> {
  //   return this.prisma.relationFriend.delete({
  //     where: {
  //       //oui je sais que c'est du caca je vais corriger ca
  //       userAId: idA,
  //       userBId: idB
  //       // OR: [
  //       //   {
  //       //     userAId: idA,
  //       //     userBId: idB
  //       //   },
  //       //   {
  //       //     userAId: idA,
  //       //     userBId: idB
  //       //   }
  //       // ]
  //     }
  //   })
  // }
}
