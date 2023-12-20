import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async incrementLevel(id: string, xpNumber: number): Promise<User> {
    return this.prisma.user.update({
      where: {
        id
      },
      data: { level: { increment: xpNumber } }
    })
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
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

    return user !== null
  }

  async isMailUsed(mail: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        mail
      }
    })

    return user !== null
  }

  async findUsersByUserIds(userIds: string[]): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        id: {
          in: userIds
        }
      }
    })
  }

  async findBestUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: {
        level: 'desc'
      },
      take: 25
    })
  }
}
