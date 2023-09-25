import { Injectable } from '@nestjs/common'
import { Prisma, PrivateMessage } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PrivateMessageService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(
    data: Prisma.PrivateMessageCreateInput
  ): Promise<PrivateMessage> {
    return this.prisma.privateMessage.create({
      data
    })
  }

  async update(
    id: string,
    data: Prisma.PrivateMessageUpdateInput
  ): Promise<PrivateMessage> {
    return this.prisma.privateMessage.update({
      where: {
        id
      },
      data
    })
  }
  async delete(id: string): Promise<PrivateMessage> {
    return this.prisma.privateMessage.delete({
      where: {
        id
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findOne(id: string): Promise<PrivateMessage | null> {
    return this.prisma.privateMessage.findUnique({
      where: {
        id
      }
    })
  }

  async findAll(id: string): Promise<PrivateMessage[]> {
    return this.prisma.privateMessage.findMany({
      where: {
        OR: [{ senderId: id }, { receiverId: id }]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
