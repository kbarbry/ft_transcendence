import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RelationFriendService } from './relation-friend.service'
import { RelationFriend } from './entities/relation-friend.entity'
import { RelationFriendInput } from './dto/create-relation-friend.input'
import { ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from 'src/common/pipes/nanoid.pipe'

@Resolver(() => RelationFriend)
export class RelationFriendResolver {
  constructor(private readonly relationFriendService: RelationFriendService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => RelationFriend)
  async createRelationFriend(
    @Args('data', { type: () => RelationFriendInput }, ValidationPipe)
    data: RelationFriendInput
  ): Promise<RelationFriend> {
    return this.relationFriendService.create(data)
  }

  @Mutation(() => RelationFriend)
  async deleteRelationRequests(
    @Args('userAId', { type: () => String }, NanoidValidationPipe)
    userAId: string,
    @Args('userBId', { type: () => String }, NanoidValidationPipe)
    userBId: string
  ): Promise<RelationFriend> {
    return this.relationFriendService.delete(userAId, userBId)
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