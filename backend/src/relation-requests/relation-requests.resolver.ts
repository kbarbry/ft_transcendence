import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Context
} from '@nestjs/graphql'
import { RelationRequestsService } from './relation-requests.service'
import { RelationRequests } from './entities/relation-requests.entity'
import { RelationFriend } from '../relation-friend/entities/relation-friend.entity'
import { RelationRequestsInput } from './dto/create-relation-requests.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'
import { ExceptionRelationRequestForbiddenAccess } from '../user/exceptions/request.exceptions'

@Resolver(() => RelationRequests)
@UseGuards(AuthorizationGuard)
export class RelationRequestsResolver {
  constructor(
    private readonly relationRequestsService: RelationRequestsService,
    private readonly pubSub: PubSub
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => RelationRequests, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  relationRequestCreation(
    @Args('userId', { type: () => String }, NanoidValidationPipe) userId: string
  ) {
    return this.pubSub.asyncIterator('requestReceived-' + userId)
  }

  @Subscription(() => RelationRequests, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  relationRequestDeleted(
    @Args('userId', { type: () => String }, NanoidValidationPipe) userId: string
  ) {
    return this.pubSub.asyncIterator('requestDeleted-' + userId)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => RelationRequests)
  async createRelationRequests(
    @Args('data', { type: () => RelationRequestsInput }, ValidationPipe)
    data: RelationRequestsInput,
    @Context() ctx: any
  ): Promise<RelationRequests | RelationFriend> {
    if (ctx?.req?.user?.id !== data.userSenderId)
      throw new ExceptionRelationRequestForbiddenAccess()

    const res = await this.relationRequestsService.create(data)

    if (res)
      await this.pubSub.publish('requestReceived-' + data.userReceiverId, {
        res
      })
    return res
  }

  @Mutation(() => RelationRequests)
  async deleteRelationRequests(
    @Args('userSenderId', { type: () => String }, NanoidValidationPipe)
    userSenderId: string,
    @Args('userReceiverId', { type: () => String }, NanoidValidationPipe)
    userReceiverId: string,
    @Context() ctx: any
  ): Promise<RelationRequests> {
    if (ctx?.req?.user?.id !== userSenderId)
      throw new ExceptionRelationRequestForbiddenAccess()

    const res = await this.relationRequestsService.delete(
      userSenderId,
      userReceiverId
    )

    if (res)
      await this.pubSub.publish('requestDeleted-' + userReceiverId, {
        res
      })
    return res
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => RelationRequests)
  findOneRelationRequests(
    @Args('userSenderId', { type: () => String }, NanoidValidationPipe)
    userSenderId: string,
    @Args('userReceiverId', { type: () => String }, NanoidValidationPipe)
    userReceiverId: string
  ): Promise<RelationRequests | null> {
    return this.relationRequestsService.findOne(userSenderId, userReceiverId)
  }

  @Query(() => Boolean)
  async isRelationRequestsRequested(
    @Args('userSenderId', { type: () => String }, NanoidValidationPipe)
    userSenderId: string,
    @Args('userReceiverId', { type: () => String }, NanoidValidationPipe)
    userReceiverId: string
  ): Promise<boolean> {
    return this.relationRequestsService.isRequested(
      userSenderId,
      userReceiverId
    )
  }

  @Query(() => [String])
  async findAllRelationRequestsSent(
    @Args('userSenderId', { type: () => String }, NanoidValidationPipe)
    userSenderId: string
  ): Promise<string[]> {
    return this.relationRequestsService.findAllRequestSent(userSenderId)
  }

  @Query(() => [String])
  async findAllRelationRequestsReceived(
    @Args('userReceiverId', { type: () => String }, NanoidValidationPipe)
    userReceiverId: string
  ): Promise<string[]> {
    return this.relationRequestsService.findAllRequestReceived(userReceiverId)
  }
}
