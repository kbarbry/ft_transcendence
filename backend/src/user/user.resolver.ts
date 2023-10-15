import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { ValidationPipe } from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => User)
  async createUser(
    @Args('data', { type: () => CreateUserInput }, ValidationPipe)
    createUserDto: CreateUserInput
  ): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('data', { type: () => UpdateUserInput }, ValidationPipe)
    data: UpdateUserInput
  ): Promise<User> {
    return this.userService.update(id, data)
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('id', { type: () => String }) id: string
  ): Promise<User> {
    return this.userService.delete(id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => User)
  findOne(
    @Args('id', { type: () => String }) id: string
  ): Promise<User | null> {
    return this.userService.findOne(id)
  }

  @Query(() => User)
  findOnebyMail(
    @Args('mail', { type: () => String }) mail: string
  ): Promise<User | null> {
    return this.userService.findOnebyMail(mail)
  }

  @Query(() => User)
  findOneByUsername(
    @Args('username', { type: () => String }) username: string
  ): Promise<User | null> {
    return this.userService.findOneByUsername(username)
  }

  @Query(() => User)
  isUsernameUsed(
    @Args('username', { type: () => String }) username: string
  ): Promise<boolean> {
    return this.userService.isUsernameUsed(username)
  }
}
