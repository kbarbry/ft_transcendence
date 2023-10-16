import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { GameStatService } from './game-stat.service'
import { GameStat } from './entities/game-stat.entity'
import { CreateGameStatInput } from './dto/create-game-stat.input'
import { ValidationPipe } from '@nestjs/common'

@Resolver(() => GameStat)
export class GameStatResolver {
  constructor(private readonly gamestatService: GameStatService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => GameStat)
  async createGameStat(
    @Args('data', { type: () => CreateGameStatInput }, ValidationPipe)
    createGamestatDto: CreateGameStatInput
  ): Promise<GameStat> {
    return this.gamestatService.create(createGamestatDto)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => GameStat)
  findOneGameStat(
    @Args('id', { type: () => String }) id: string
  ): Promise<GameStat | null> {
    return this.gamestatService.findOne(id)
  }

  @Query(() => [GameStat])
  findAllGameStat(
    @Args('id', { type: () => String }) id: string
  ): Promise<GameStat[]> {
    return this.gamestatService.findAll(id)
  }

  @Query(() => [GameStat])
  findWin(@Args('id', { type: () => String }) id: string): Promise<GameStat[]> {
    return this.gamestatService.findWin(id)
  }
  @Query(() => [GameStat])
  findLose(
    @Args('id', { type: () => String }) id: string
  ): Promise<GameStat[]> {
    return this.gamestatService.findLose(id)
  }

  @Query(() => [GameStat])
  findClassic(
    @Args('id', { type: () => String }) id: string
  ): Promise<GameStat[]> {
    return this.gamestatService.findClassic(id)
  }

  @Query(() => [GameStat])
  findSpecial(
    @Args('id', { type: () => String }) id: string
  ): Promise<GameStat[]> {
    return this.gamestatService.findSpecial(id)
  }
}
