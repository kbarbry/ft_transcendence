import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Context
} from '@nestjs/graphql'
import { RelationRequestsService } from './relation-requests.service'
import {
  ECreationType,
  RelationRequests
} from './entities/relation-requests.entity'
import { RelationRequestsInput } from './dto/create-relation-requests.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'
import {
  ForbiddenAccessData,
  userContextGuard
} from 'src/auth/guards/request.guards'

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
  ): Promise<RelationRequests> {
    if (!userContextGuard(ctx?.req?.user?.id, data.userSenderId))
      throw new ForbiddenAccessData()

    const resRequest = await this.relationRequestsService.create(data)

    let res: RelationRequests
    const resSub = 'userBId' in resRequest
    if (resSub) {
      res = {
        userReceiverId: data.userReceiverId,
        userSenderId: data.userSenderId,
        type: ECreationType.friend
      }
      await this.pubSub.publish('requestReceived-' + resRequest.userAId, {
        res
      })
      await this.pubSub.publish('requestReceived-' + resRequest.userBId, {
        res
      })
    } else {
      res = {
        userReceiverId: resRequest.userReceiverId,
        userSenderId: resRequest.userSenderId,
        type: ECreationType.friend
      }
      await this.pubSub.publish('requestReceived-' + res.userReceiverId, {
        res
      })
    }
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
    if (!userContextGuard(ctx?.req?.user?.id, userSenderId, userReceiverId))
      throw new ForbiddenAccessData()

    const res = await this.relationRequestsService.delete(
      userSenderId,
      userReceiverId
    )

    await this.pubSub.publish('requestDeleted-' + userSenderId, {
      res
    })
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
