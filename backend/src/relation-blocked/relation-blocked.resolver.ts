import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RelationBlockedService } from './relation-blocked.service'
import { RelationBlocked } from './entities/relation-blocked.entity'
import { RelationBlockedInput } from './dto/create-relation-blocked.input'
import { ValidationPipe } from '@nestjs/common'

@Resolver(() => RelationBlocked)
export class RelationBlockedResolver {
  constructor(
    private readonly relationBlockedService: RelationBlockedService
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => RelationBlocked)
  async createRelationBlocked(
    @Args('data', { type: () => RelationBlockedInput }, ValidationPipe)
    createRelationBlockedDto: RelationBlockedInput
  ): Promise<RelationBlocked | null> {
    return this.relationBlockedService.create(createRelationBlockedDto)
  }

  @Mutation(() => RelationBlocked)
  async deleteRelationBlocked(
    @Args('userAId', { type: () => String }) userAId: string,
    @Args('userBId', { type: () => String }) userBId: string
  ) {
    return this.relationBlockedService.delete(userAId, userBId)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => Boolean)
  async isRelationBlocked(
    @Args('userAId', { type: () => String }) userAId: string,
    @Args('userBId', { type: () => String }) userBId: string
  ): Promise<boolean> {
    return this.relationBlockedService.isBlocked(userAId, userBId)
  }

  @Query(() => [String])
  findAllBlockedByUser(
    @Args('id', { type: () => String }) id: string
  ): Promise<string[]> {
    return this.relationBlockedService.findAllBlockedByUser(id)
  }
}
