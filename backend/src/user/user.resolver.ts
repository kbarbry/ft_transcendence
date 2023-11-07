import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { NanoidsValidationPipe } from '../common/pipes/nanoids.pipe'
import { EmailValidationPipe } from '../common/pipes/email.pipe'
import { UsernameValidationPipe } from '../common/pipes/username.pipe'
import { AuthorizationGuard } from '../auth/guards/authorization.guard'

@Resolver(() => User)
// @UseGuards(AuthorizationGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string,
    @Args('data', { type: () => UpdateUserInput }, ValidationPipe)
    data: UpdateUserInput
  ): Promise<User> {
    return this.userService.update(id, data)
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<User> {
    return this.userService.delete(id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => User)
  findOneUser(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<User | null> {
    return this.userService.findOne(id)
  }

  @Query(() => User)
  findOneUserbyMail(
    @Args('mail', { type: () => String }, EmailValidationPipe) mail: string
  ): Promise<User | null> {
    return this.userService.findOnebyMail(mail)
  }

  @Query(() => User)
  findOneUserByUsername(
    @Args('username', { type: () => String }, UsernameValidationPipe)
    username: string
  ): Promise<User | null> {
    return this.userService.findOneByUsername(username)
  }

  @Query(() => Boolean)
  isUserUsernameUsed(
    @Args('username', { type: () => String }, UsernameValidationPipe)
    username: string
  ): Promise<boolean> {
    return this.userService.isUsernameUsed(username)
  }

  @Query(() => [User])
  findUsersByUserIds(
    @Args('userIds', { type: () => [String] }, NanoidsValidationPipe)
    userIds: string[]
  ): Promise<User[]> {
    return this.userService.findUsersByUserIds(userIds)
  }
}
