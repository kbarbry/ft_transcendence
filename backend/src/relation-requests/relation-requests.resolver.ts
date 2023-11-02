import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RelationRequestsService } from './relation-requests.service'
import { RelationRequests } from './entities/relation-requests.entity'
import { RelationFriend } from '../relation-friend/entities/relation-friend.entity'
import { RelationRequestsInput } from './dto/create-relation-requests.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { AuthorizationGuard } from '../auth/guards/authorization.guard'

@Resolver(() => RelationRequests)
@UseGuards(AuthorizationGuard)
export class RelationRequestsResolver {
  constructor(
    private readonly relationRequestsService: RelationRequestsService
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => RelationRequests)
  async createRelationRequests(
    @Args('data', { type: () => RelationRequestsInput }, ValidationPipe)
    data: RelationRequestsInput
  ): Promise<RelationRequests | RelationFriend> {
    return this.relationRequestsService.create(data)
  }

  @Mutation(() => RelationRequests)
  async deleteRelationRequests(
    @Args('userSenderId', { type: () => String }, NanoidValidationPipe)
    userSenderId: string,
    @Args('userReceiverId', { type: () => String }, NanoidValidationPipe)
    userReceiverId: string
  ): Promise<RelationRequests> {
    return this.relationRequestsService.delete(userSenderId, userReceiverId)
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
