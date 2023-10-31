import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { GameStatService } from './game-stat.service'
import { GameStat } from './entities/game-stat.entity'
import { CreateGameStatInput } from './dto/create-game-stat.input'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard'

@Resolver(() => GameStat)
@UseGuards(AuthorizationGuard)
export class GameStatResolver {
  constructor(private readonly gamestatService: GameStatService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => GameStat)
  async createGameStat(
    @Args('data', { type: () => CreateGameStatInput }, ValidationPipe)
    data: CreateGameStatInput
  ): Promise<GameStat> {
    return this.gamestatService.create(data)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => GameStat)
  findOneGameStat(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<GameStat | null> {
    return this.gamestatService.findOne(id)
  }

  @Query(() => [GameStat])
  findAllGameStat(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<GameStat[]> {
    return this.gamestatService.findAll(id)
  }

  @Query(() => [GameStat])
  findGameStatWin(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<GameStat[]> {
    return this.gamestatService.findWin(id)
  }
  @Query(() => [GameStat])
  findGameStatLose(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<GameStat[]> {
    return this.gamestatService.findLose(id)
  }

  @Query(() => [GameStat])
  findGameStatClassic(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<GameStat[]> {
    return this.gamestatService.findClassic(id)
  }

  @Query(() => [GameStat])
  findGameStatSpecial(
    @Args('id', { type: () => String }, NanoidValidationPipe) id: string
  ): Promise<GameStat[]> {
    return this.gamestatService.findSpecial(id)
  }
}
