import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserPresenceService } from './user-presence.service'
import { UserPresence } from './entities/user-presence.entity'
import { UserPresenceCreateInput } from './dto/create-user-presence.input'
import { ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'

@Resolver(() => UserPresence)
export class UserPresenceResolver {
  constructor(private readonly userpresenceService: UserPresenceService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => UserPresence)
  async createUserPresence(
    @Args('data', { type: () => UserPresenceCreateInput }, ValidationPipe)
    data: UserPresenceCreateInput
  ): Promise<UserPresence> {
    return this.userpresenceService.create(data)
  }

  @Mutation(() => UserPresence)
  async disconnectedUserPresence(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<UserPresence> {
    return this.userpresenceService.disconnected(id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => Boolean)
  async isUserPresenceConnected(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<boolean> {
    return this.userpresenceService.isConnected(id)
  }

  @Query(() => UserPresence)
  async findOneUserPresence(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<UserPresence | null> {
    return this.userpresenceService.findOne(id)
  }

  @Query(() => UserPresence)
  async findLastUserPresenceByUserId(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<UserPresence | null> {
    return this.userpresenceService.findLastByUserId(id)
  }

  @Query(() => [UserPresence])
  async findAllUserPresenceByUserId(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<UserPresence[]> {
    return this.userpresenceService.findAllByUserId(id)
  }
}
