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
    senderId: string,
    receiverId: string
  ): Promise<PrivateMessage[]> {
    return this.prisma.privateMessage.findMany({
      where: {
        OR: [
          { AND: [{ senderId }, { receiverId }] },
          { AND: [{ senderId: receiverId }, { receiverId: senderId }] }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findPrivateMessageContain(
    senderId: string,
    receiverId: string,
    needle: string
  ): Promise<PrivateMessage[]> {
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
              { AND: [{ senderId }, { receiverId }] },
              { AND: [{ senderId: receiverId }, { receiverId: senderId }] }
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
