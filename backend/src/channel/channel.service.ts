import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, Channel } from '@prisma/client'
import { UserService } from '../user/user.service'
import {
  ExceptionTryingToUpdateChannelID,
  ExceptionInvalidMaxUserInChannel,
  ExceptionTryingToUpdateDate,
  ExceptionInvalidDataMaxUsers,
  ExceptionUnknowUser
} from './exceptions/channel.exception'

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  @Inject(UserService)
  private readonly UserService: UserService

  //**************************************************//
  //  MUTATION
  //**************************************************//

  //   Effectuer la mise à jour de l'ID du propriétaire (veillez à l'injection du service utilisateur)
  // Modifiez la mise à jour pour bloquer la modification du OwnerID (et effectuez le test selon les spécifications)

  // Testez que la mise à jour ne peut pas mettre à jour le OwnerID et la méthode UpdateOwner Peut mettre à jour le OwnerID
  // Changez le nom du canal déjà supprimé et faites-le "Supprimer le canal non existant"
  // Faites un test avec "Créer une chaîne avec un nom déjà pris"
  // Faites un test avec "mise à jour avec nom déjà pris"
  // Faites un test avec "mettre à jour OwnerId avec un ID incorrect"

  async create(data: Prisma.ChannelCreateInput): Promise<Channel> {
    const maxUsers = data.maxUsers?.valueOf()
    if (maxUsers && (maxUsers < 2 || maxUsers > 50)) {
      throw new ExceptionInvalidMaxUserInChannel()
    }
    return this.prisma.channel.create({
      data
    })
  }

  async update(id: string, data: Prisma.ChannelUpdateInput): Promise<Channel> {
    if (data.maxUsers) {
      const maxUsers = data.maxUsers as number
      if (maxUsers < 2 || maxUsers > 50)
        throw new ExceptionInvalidMaxUserInChannel()
      else if (maxUsers >= 2 && maxUsers <= 50) data.maxUsers = maxUsers
      else throw new ExceptionInvalidDataMaxUsers()
    }

    if (data.id) throw new ExceptionTryingToUpdateChannelID()
    //if (data.owner?.connect?.id) throw new ExceptionTryingToUpdateOwnerID()
    if (data.createdAt) throw new ExceptionTryingToUpdateDate()
    return this.prisma.channel.update({
      where: {
        id
      },
      data
    })
  }

  async delete(id: string): Promise<Channel> {
    return this.prisma.channel.delete({
      where: {
        id
      }
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  async findOne(id: string): Promise<Channel | null> {
    return this.prisma.channel.findUnique({
      where: {
        id
      }
    })
  }

  async findAllThatContain(str: string): Promise<Channel[] | null> {
    return await this.prisma.channel.findMany({
      where: {
        name: { contains: str }
      },
      orderBy: {
        name: 'desc'
      }
    })
  }

  async findOwner(channelId: string): Promise<string | null> {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId
      }
    })

    return channel ? channel.ownerId : null
  }

  async findAllChannelOfOwner(id: string): Promise<Channel[] | null> {
    return this.prisma.channel.findMany({
      where: {
        ownerId: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
  async updateOwner(id: string, ownerId: string): Promise<Channel | null> {
    const userExist = await this.UserService.findOne(ownerId)
    if (!userExist) {
      throw new ExceptionUnknowUser()
    }
    return this.prisma.channel.update({
      where: {
        id
      },
      data: {
        ownerId
      }
    })
  }
}
