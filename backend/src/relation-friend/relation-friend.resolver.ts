import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Context
} from '@nestjs/graphql'
import { RelationFriendService } from './relation-friend.service'
import { RelationFriend } from './entities/relation-friend.entity'
import { UseGuards } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from '../auth/guards/authorization.guard'
import { PubSub } from 'graphql-subscriptions'
import { ExceptionRelationFriendForbiddenAccess } from '../user/exceptions/friend.exceptions'

@Resolver(() => RelationFriend)
@UseGuards(AuthorizationGuard)
export class RelationFriendResolver {
  constructor(
    private readonly relationFriendService: RelationFriendService,
    private readonly pubSub: PubSub
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => RelationFriend, {
    resolve: (payload) => (payload?.res !== undefined ? payload.res : null)
  })
  @Unprotected()
  relationFriendDeleted(
    @Args('userId', { type: () => String }, NanoidValidationPipe) userId: string
  ) {
    return this.pubSub.asyncIterator('friendDeleted-' + userId)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => RelationFriend)
  async deleteRelationFriend(
    @Args('userAId', { type: () => String }, NanoidValidationPipe)
    userAId: string,
    @Args('userBId', { type: () => String }, NanoidValidationPipe)
    userBId: string,
    @Context() ctx: any
  ): Promise<RelationFriend> {
    if (ctx?.req?.user?.id !== userAId && ctx?.req?.user?.id !== userBId)
      throw new ExceptionRelationFriendForbiddenAccess()

    const res = await this.relationFriendService.delete(userAId, userBId)

    if (res) {
      await this.pubSub.publish('friendDeleted-' + userAId, { res })
      await this.pubSub.publish('friendDeleted-' + userBId, { res })
    }
    return res
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => [String])
  findAllRelationFriend(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<string[]> {
    return this.relationFriendService.findAll(id)
  }

  @Query(() => Boolean)
  async isRelationFriendExist(
    @Args('userAId', { type: () => String }, NanoidValidationPipe)
    userAId: string,
    @Args('userBId', { type: () => String }, NanoidValidationPipe)
    userBId: string
  ): Promise<boolean> {
    return this.relationFriendService.isFriend(userAId, userBId)
  }
}
