import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Context
} from '@nestjs/graphql'
import { ChannelService } from './channel.service'
import { Channel } from './entities/channel.entity'
import { CreateChannelInput } from './dto/create-channel.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import {
  UpdateChannelInput,
  UpdateChannelOwnerIdInput
} from './dto/update-channel.input'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { StringValidationPipe } from '../common/pipes/string.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { NanoidsValidationPipe } from 'src/common/pipes/nanoids.pipe'
import { UsernameValidationPipe } from 'src/common/pipes/username.pipe'
import { PubSub } from 'graphql-subscriptions'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  ForbiddenAccessChannelAdmin,
  ForbiddenAccessChannelOwner,
  ForbiddenAccessData,
  channelAdminGuard,
  channelOwnerGuard,
  userContextGuard
} from 'src/auth/guards/request.guards'
import * as bcrypt from 'bcrypt'

@Resolver(() => Channel)
@UseGuards(AuthorizationGuard)
export class ChannelResolver {
  constructor(
    private readonly channelService: ChannelService,
    private readonly pubSub: PubSub,
    private prisma: PrismaService
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => Channel, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelEdition(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    return this.pubSub.asyncIterator('channelEdited-' + id)
  }

  @Subscription(() => Channel, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  channelDeletion(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string
  ) {
    return this.pubSub.asyncIterator('channelDeleted-' + id)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => Channel)
  async createChannel(
    @Args('data', { type: () => CreateChannelInput }, ValidationPipe)
    data: CreateChannelInput,
    @Context() ctx: any
  ): Promise<Channel> {
    if (!userContextGuard(ctx?.req?.user?.id, data.ownerId))
      throw new ForbiddenAccessData()
    if (data?.password) data.password = bcrypt.hashSync(data.password, 10)
    return this.channelService.create(data)
  }

  @Mutation(() => Channel)
  async updateChannel(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string,
    @Args('data', { type: () => UpdateChannelInput }, ValidationPipe)
    data: UpdateChannelInput,
    @Context() ctx: any
  ): Promise<Channel> {
    if (!(await channelAdminGuard(ctx?.req?.user?.id, id, this.prisma)))
      throw new ForbiddenAccessChannelAdmin()
    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: id }
    })
    if (data?.password) data.password = bcrypt.hashSync(data.password, 10)

    const res = await this.channelService.update(id, data)

    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('channelEdited-' + value.userId, { res })
      })
    )

    return res
  }

  @Mutation(() => Channel)
  async updateChannelOwner(
    @Args('id', { type: () => String }, NanoidValidationPipe)
    id: string,
    @Args('data', { type: () => UpdateChannelOwnerIdInput }, ValidationPipe)
    data: UpdateChannelOwnerIdInput,
    @Context() ctx: any
  ): Promise<Channel | null> {
    if (!(await channelOwnerGuard(ctx?.req?.user?.id, id, this.prisma)))
      throw new ForbiddenAccessChannelOwner()

    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: id }
    })

    const res = await this.channelService.updateOwner(id, data)

    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('channelEdited-' + value.userId, { res })
      })
    )

    return res
  }

  @Mutation(() => Channel)
  async deleteChannel(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string,
    @Context() ctx: any
  ): Promise<Channel> {
    if (!(await channelOwnerGuard(ctx?.req?.user?.id, id, this.prisma)))
      throw new ForbiddenAccessChannelOwner()

    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: id }
    })

    const res = await this.channelService.delete(id)

    await Promise.all(
      channelMembers.map(async (value) => {
        await this.pubSub.publish('channelDeleted-' + value.userId, { res })
      })
    )

    return res
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => Channel)
  findOneChannel(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<Channel | null> {
    return this.channelService.findOne(id)
  }

  @Query(() => Channel)
  findOneChannelByName(
    @Args('name', { type: () => String }, UsernameValidationPipe) name: string
  ): Promise<Channel | null> {
    return this.channelService.findOneByUsername(name)
  }

  @Query(() => [Channel])
  findChannelByChannelIds(
    @Args('channelIds', { type: () => [String] }, NanoidsValidationPipe)
    channelIds: string[]
  ): Promise<Channel[]> {
    return this.channelService.findChannelByChannelIds(channelIds)
  }

  @Query(() => [Channel])
  findAllChannelThatContain(
    @Args('needle', { type: () => String }, StringValidationPipe) needle: string
  ): Promise<Channel[]> {
    return this.channelService.findAllThatContain(needle)
  }

  @Query(() => String)
  findChannelOwner(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<string | null> {
    return this.channelService.findOwner(channelId)
  }

  @Query(() => [Channel])
  findAllChannelOfOwner(
    @Args('userId', { type: () => String }, NanoidValidationPipe) userId: string
  ): Promise<Channel[]> {
    return this.channelService.findAllChannelOfOwner(userId)
  }

  @Query(() => Boolean)
  isChannelPasswordSet(
    @Args('channelId', { type: () => String }, NanoidValidationPipe)
    channelId: string
  ): Promise<boolean> {
    return this.channelService.isChannelPasswordSet(channelId)
  }
}
