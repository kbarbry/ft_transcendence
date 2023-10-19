import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RelationBlockedService } from './relation-blocked.service'
import { RelationBlocked } from './entities/relation-blocked.entity'
import { RelationBlockedInput } from './dto/create-relation-blocked.input'
import { ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from 'src/common/pipes/nanoid.pipe'

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
    data: RelationBlockedInput
  ): Promise<RelationBlocked> {
    return this.relationBlockedService.create(data)
  }

  @Mutation(() => RelationBlocked)
  async deleteRelationBlocked(
    @Args('userAId', { type: () => String }, NanoidValidationPipe)
    userAId: string,
    @Args('userBId', { type: () => String }, NanoidValidationPipe)
    userBId: string
  ): Promise<RelationBlocked> {
    return this.relationBlockedService.delete(userAId, userBId)
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
