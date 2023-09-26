import { Injectable } from '@nestjs/common'
import { Prisma, PrivateMessage } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import {
  ExceptionTryingToUpdatePrivateMessageID,
  ExceptionPrivateMessageYourself,
  ExceptionTryingToUpdateDateMessage,
  ExceptionTryingToUpdateUsersId
} from '../channel/exceptions/private-message.exception'

@Injectable()
export class PrivateMessageService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(
    data: Prisma.PrivateMessageCreateInput
  ): Promise<PrivateMessage> {
    if (data.receiver.connect?.id == data.sender.connect?.id) {
      throw new ExceptionPrivateMessageYourself()
    }
    return this.prisma.privateMessage.create({
      data
    })
  }

  async update(
    id: string,
    data: Prisma.PrivateMessageUpdateInput
  ): Promise<PrivateMessage> {
    if (data.id) throw new ExceptionTryingToUpdatePrivateMessageID()
    if (data.createdAt) throw new ExceptionTryingToUpdateDateMessage()
    if (data.receiver?.connect?.id || data.sender?.connect?.id)
      throw new ExceptionTryingToUpdateUsersId()
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
  async findAllMessageWith(
    idSender: string,
    idReceiv: string
  ): Promise<PrivateMessage[]> {
    return this.prisma.privateMessage.findMany({
      where: {
        OR: [
          { AND: [{ senderId: idSender }, { receiverId: idReceiv }] },
          { AND: [{ senderId: idReceiv }, { receiverId: idSender }] }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findAllMessageWithLiteVersion(
    idSender: string,
    idReceiv: string
  ): Promise<PrivateMessage[]> {
    return this.prisma.privateMessage.findMany({
      where: {
        OR: [
          { AND: [{ senderId: idSender }, { receiverId: idReceiv }] },
          { AND: [{ senderId: idReceiv }, { receiverId: idSender }] }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    })
  }
}
