import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RelationRequestsService } from './relation-requests.service'
import { RelationRequests } from './entities/relation-requests.entity'
import { RelationFriend } from '../relation-friend/entities/relation-friend.entity'
import { RelationRequestsInput } from './dto/create-relation-requests.input'
import { ValidationPipe } from '@nestjs/common'

@Resolver(() => RelationRequests)
export class RelationRequestsResolver {
  constructor(
    private readonly relationRequestsService: RelationRequestsService
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => RelationRequests)
  async createUser(
    @Args('data', { type: () => RelationRequestsInput }, ValidationPipe)
    createRelationRequestsDto: RelationRequestsInput
  ): Promise<RelationRequests | RelationFriend> {
    return this.relationRequestsService.create(createRelationRequestsDto)
  }

  @Mutation(() => RelationRequests)
  async deleteRelationRequests(
    @Args('senderId', { type: () => String }) SenderId: string,
    @Args('ReceiverId', { type: () => String }) ReceiverId: string
  ): Promise<RelationRequests> {
    return this.relationRequestsService.delete(SenderId, ReceiverId)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => RelationRequests)
  findOne(
    @Args('userSenderId', { type: () => String }) userSenderId: string,
    @Args('userReceiverId', { type: () => String }) userReceiverId: string
  ): Promise<RelationRequests | null> {
    return this.relationRequestsService.findOne(userSenderId, userReceiverId)
  }

  @Query(() => Boolean)
  async isRequested(
    @Args('userSenderId', { type: () => String }) userSenderId: string,
    @Args('userReceiverId', { type: () => String }) userReceiverId: string
  ): Promise<boolean> {
    return this.relationRequestsService.isRequested(
      userSenderId,
      userReceiverId
    )
  }

  @Query(() => [String])
  async findAllRequestsSent(
    @Args('id', { type: () => String }) id: string
  ): Promise<string[]> {
    return this.relationRequestsService.findAllRequestSent(id)
  }

  @Query(() => [String])
  async findAllRequestsReceived(
    @Args('id', { type: () => String }) id: string
  ): Promise<string[]> {
    return this.relationRequestsService.findAllRequestReceived(id)
  }
}
