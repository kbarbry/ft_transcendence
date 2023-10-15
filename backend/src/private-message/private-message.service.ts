import { Injectable } from '@nestjs/common'
import { PrivateMessage } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { ExceptionPrivateMessageYourself } from '../channel/exceptions/private-message.exception'
import { CreatePrivateMessageInput } from './dto/create-private-message.input'
import { UpdatePrivateMessageInput } from './dto/update-private-message.input'

@Injectable()
export class PrivateMessageService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: CreatePrivateMessageInput): Promise<PrivateMessage> {
    if (data.senderId === data.receiverId) {
      throw new ExceptionPrivateMessageYourself()
    }
    return this.prisma.privateMessage.create({
      data
    })
  }

  async update(
    id: string,
    data: UpdatePrivateMessageInput
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

  async findPrivateMessageContain(
    idSender: string,
    idReceiv: string,
    needle: string
  ): Promise<PrivateMessage[] | null> {
    return this.prisma.privateMessage.findMany({
      where: {
        AND: [
          {
            content: {
              contains: needle
            }
          },
          {
            OR: [
              { AND: [{ senderId: idSender }, { receiverId: idReceiv }] },
              { AND: [{ senderId: idReceiv }, { receiverId: idSender }] }
            ]
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
