import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import {
  ExceptionUserTryingToUpdateCreationDate,
  ExceptionUserTryingToUpdateEmail,
  ExceptionUserTryingToUpdateID
} from './exceptions/user.exceptions'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data
    })
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    if (data.id) throw new ExceptionUserTryingToUpdateID()
    if (data.createdAt) throw new ExceptionUserTryingToUpdateCreationDate()
    if (data.mail) throw new ExceptionUserTryingToUpdateEmail()
    return this.prisma.user.update({
      where: {
        id
      },
      data
    })
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async findOnebyMail(mail: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        mail
      }
    })
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username
      }
    })
  }

  async isUsernameUsed(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        username
      }
    })
    if (user !== null) {
      return true
    }
    return false
  }
}
