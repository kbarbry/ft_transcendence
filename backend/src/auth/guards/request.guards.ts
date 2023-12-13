import { HttpException, HttpStatus } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export class ForbiddenAccessData extends HttpException {
  constructor() {
    super(
      "You are trying to reach data that you're not authorized to access or edit",
      HttpStatus.CONFLICT
    )
  }
}

export class ForbiddenAccessChannelAdmin extends HttpException {
  constructor() {
    super(
      "You are trying to reach data that you're not authorized to access or edit",
      HttpStatus.CONFLICT
    )
  }
}

export class ForbiddenAccessChannelOwner extends HttpException {
  constructor() {
    super(
      "You are trying to reach data that you're not authorized to access or edit",
      HttpStatus.CONFLICT
    )
  }
}

export const userContextGuard = (
  contextId: string,
  userId: string,
  userId2?: string
) => {
  console.log('User guard')
  if (userId2) if (contextId !== userId && contextId !== userId2) return false
  if (contextId !== userId) return false
  return true
}

export const channelAdminGuard = async (
  userId: string,
  channelId: string,
  prisma: PrismaService
) => {
  console.log('Admin guard')
  const channelMember = await prisma.channelMember.findUnique({
    where: {
      userId_channelId: {
        userId,
        channelId
      }
    }
  })
  console.log(JSON.stringify(channelMember))
  if (channelMember?.type === 'Member') return false
  return true
}

export const channelOwnerGuard = async (
  userId: string,
  channelId: string,
  prisma: PrismaService
) => {
  console.log('Owner guard')
  const channel = await prisma.channel.findUnique({ where: { id: channelId } })
  if (channel?.ownerId !== userId) return false
  return true
}
