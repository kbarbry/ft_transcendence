import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Context
} from '@nestjs/graphql'
import { RelationBlockedService } from './relation-blocked.service'
import { RelationBlocked } from './entities/relation-blocked.entity'
import { RelationBlockedInput } from './dto/create-relation-blocked.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'
import { ExceptionRelationBlockedForbiddenAccess } from '../user/exceptions/blocked.exceptions'

@Resolver(() => RelationBlocked)
@UseGuards(AuthorizationGuard)
export class RelationBlockedResolver {
  constructor(
    private readonly relationBlockedService: RelationBlockedService,
    private readonly pubSub: PubSub
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => RelationBlocked, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  relationBlockedCreation(
    @Args('userId', { type: () => String }, NanoidValidationPipe) userId: string
  ) {
    return this.pubSub.asyncIterator('blockedReceived-' + userId)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => RelationBlocked)
  async createRelationBlocked(
    @Args('data', { type: () => RelationBlockedInput }, ValidationPipe)
    data: RelationBlockedInput,
    @Context() ctx: any
  ): Promise<RelationBlocked> {
    if (ctx?.req?.user?.id !== data.userBlockingId)
      throw new ExceptionRelationBlockedForbiddenAccess()

    const res = await this.relationBlockedService.create(data)

    await this.pubSub.publish('blockedReceived-' + data.userBlockedId, {
      res
    })
    return res
  }

  @Mutation(() => RelationBlocked)
  async deleteRelationBlocked(
    @Args('userAId', { type: () => String }, NanoidValidationPipe)
    userAId: string,
    @Args('userBId', { type: () => String }, NanoidValidationPipe)
    userBId: string,
    @Context() ctx: any
  ): Promise<RelationBlocked> {
    if (ctx?.req?.user?.id !== userAId)
      throw new ExceptionRelationBlockedForbiddenAccess()

    const res = await this.relationBlockedService.delete(userAId, userBId)
    return res
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => Boolean)
  async isRelationBlocked(
    @Args('userAId', { type: () => String }, NanoidValidationPipe)
    userAId: string,
    @Args('userBId', { type: () => String }, NanoidValidationPipe)
    userBId: string
  ): Promise<boolean> {
    return this.relationBlockedService.isBlocked(userAId, userBId)
  }

  @Query(() => [String])
  findAllRelationBlockedByUser(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<string[]> {
    return this.relationBlockedService.findAllBlockedByUser(id)
  }
}
