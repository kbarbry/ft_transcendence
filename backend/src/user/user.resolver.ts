import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Subscription
} from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import {
  UnauthorizedException,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { NanoidsValidationPipe } from '../common/pipes/nanoids.pipe'
import { EmailValidationPipe } from '../common/pipes/email.pipe'
import { UsernameValidationPipe } from '../common/pipes/username.pipe'
import {
  AuthorizationGuard,
  Unprotected,
  Unprotected2fa
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'
import {
  ForbiddenAccessData,
  userContextGuard
} from 'src/auth/guards/request.guards'
import { PrismaService } from 'src/prisma/prisma.service'

@Resolver(() => User)
@UseGuards(AuthorizationGuard)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly pubSub: PubSub,
    private readonly prisma: PrismaService
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => User, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  userEdition(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ) {
    return this.pubSub.asyncIterator('userEdited-' + id)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string,
    @Args('data', { type: () => UpdateUserInput }, ValidationPipe)
    data: UpdateUserInput,
    @Context() ctx: any
  ): Promise<User> {
    if (!userContextGuard(ctx?.req?.user?.id, id))
      throw new ForbiddenAccessData()
    const res = await this.userService.update(id, data)

    const caseSender = (
      await this.prisma.relationFriend.findMany({
        where: {
          userAId: id
        },
        select: {
          userBId: true
        }
      })
    ).map((elem) => elem.userBId)

    const caseReceiver = (
      await this.prisma.relationFriend.findMany({
        where: {
          userBId: id
        },
        select: {
          userAId: true
        }
      })
    ).map((elem) => elem.userAId)
    const relationsFriend = [...caseSender, ...caseReceiver]

    await Promise.all(
      relationsFriend.map(async (value) => {
        await this.pubSub.publish('userEdited-' + value, { res })
      })
    )

    await this.pubSub.publish('userEdited-' + id, { res })

    return res
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<User> {
    return this.userService.delete(id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => User)
  findOneUser(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<User | null> {
    return this.userService.findOne(id)
  }

  @Query(() => User)
  @Unprotected2fa()
  findOneUserByContext(@Context() ctx: any): Promise<User | null> {
    if (!ctx?.req?.user?.id) throw new UnauthorizedException('User not found')
    return this.userService.findOne(ctx.req.user.id)
  }

  @Query(() => User)
  findOneUserbyMail(
    @Args('mail', { type: () => String }, EmailValidationPipe) mail: string
  ): Promise<User | null> {
    return this.userService.findOnebyMail(mail)
  }

  @Query(() => User)
  findOneUserByUsername(
    @Args('username', { type: () => String }, UsernameValidationPipe)
    username: string
  ): Promise<User | null> {
    return this.userService.findOneByUsername(username)
  }

  @Query(() => Boolean)
  @Unprotected2fa()
  isUserUsernameUsed(
    @Args('username', { type: () => String }, UsernameValidationPipe)
    username: string
  ): Promise<boolean> {
    return this.userService.isUsernameUsed(username)
  }

  @Query(() => Boolean)
  @Unprotected2fa()
  isUserMailUsed(
    @Args('mail', { type: () => String }, EmailValidationPipe)
    mail: string
  ): Promise<boolean> {
    return this.userService.isMailUsed(mail)
  }

  @Query(() => [User])
  findUsersByUserIds(
    @Args('userIds', { type: () => [String] }, NanoidsValidationPipe)
    userIds: string[]
  ): Promise<User[]> {
    return this.userService.findUsersByUserIds(userIds)
  }

  @Query(() => [User])
  findBestUsers(): Promise<User[]> {
    return this.userService.findBestUsers()
  }
}
