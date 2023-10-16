import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserPresenceService } from './user-presence.service'
import { UserPresence } from './entities/user-presence.entity'
import { UserPresenceCreateInput } from './dto/create-user-presence.input'
import { ValidationPipe } from '@nestjs/common'

@Resolver(() => UserPresence)
export class UserPresenceResolver {
  constructor(private readonly userpresenceService: UserPresenceService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => UserPresence)
  async createUserPresence(
    @Args('data', { type: () => UserPresenceCreateInput }, ValidationPipe)
    createUserPresenceDto: UserPresenceCreateInput
  ): Promise<UserPresence> {
    return this.userpresenceService.create(createUserPresenceDto)
  }

  @Mutation(() => UserPresence)
  async disconnected(
    @Args('id', { type: () => String }) id: string
  ): Promise<UserPresence> {
    return this.userpresenceService.disconnected(id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => Boolean)
  async isConnected(@Args('id', { type: () => String }) id: string) {
    return this.userpresenceService.isConnected(id)
  }

  @Query(() => UserPresence)
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.userpresenceService.findOne(id)
  }

  @Query(() => UserPresence)
  async findLastByUserId(@Args('id', { type: () => String }) id: string) {
    return this.userpresenceService.findLastByUserId(id)
  }

  @Query(() => UserPresence)
  async findAllByUserId(@Args('id', { type: () => String }) id: string) {
    return this.userpresenceService.findAllByUserId(id)
  }
}
