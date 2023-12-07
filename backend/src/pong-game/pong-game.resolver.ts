import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { Controls, PongGame } from './entities/pong-game.entity'
import { PongGameService } from './pong-game.service'

@Resolver(() => PongGame)
export class PongGameResolver {
  constructor(
    private readonly pubSub: PubSub,
    private readonly pongService: PongGameService
  ) {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
  @Subscription(() => String, {
    resolve: (payload) => (payload?.data !== undefined ? payload.data : null)
  })
  matchmakingNotification(
    @Args('playerId', { type: () => String }) playerId: string
  ) {
    const triggerName = 'queue' + playerId

    console.log(
      'Subscription: matchmakingNotification:  triggerName = ' + triggerName
    )
    return this.pubSub.asyncIterator(triggerName)
  }

  @Subscription(() => PongGame, {
    resolve: (payload) => (payload?.data !== undefined ? payload.data : null)
  })
  pongData(@Args('gameId', { type: () => String }) gameId: string) {
    return this.pubSub.asyncIterator(gameId)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => String)
  async testPongSubscribeMessage(
    @Args('playerId', { type: () => String }) playerId: string
  ): Promise<string> {
    const res = 'gameId' + playerId
    const triggerName = 'queue' + playerId

    console.log(
      'Mutation: testPongSubscribeMessage: triggerName = ' + triggerName
    )
    await this.pubSub.publish(triggerName, { data: res })
    return triggerName
  }

  @Mutation(() => Boolean)
  async addPlayerToMatchmakingQueue(
    @Args('playerId', { type: () => String }) playerId: string,
    @Args('nickname', { type: () => String }) nickname: string
  ): Promise<boolean> {
    console.log('Mutation: addPlayerToMatchmakingQueue:')
    const isQueued: boolean = await this.pongService.addPlayerToGameQueue({
      id: playerId,
      nickname,
      triggerName: 'queue' + playerId
    })
    if (isQueued) {
      await this.pongService.matchPlayerInQueue()
    }
    return isQueued
  }

  @Mutation(() => Boolean)
  async readyForGame(
    @Args('gameId', { type: () => String }) gameId: string,
    @Args('playerId', { type: () => String }) playerId: string
  ): Promise<boolean> {
    console.log(
      'Mutation: readyForGame: gameid = ' + gameId + ', playerId = ' + playerId
    )
    this.pongService.setPresenceInGame(gameId, playerId)
    return false //TODO update return
  }

  @Mutation(() => Boolean)
  async gameInputs(
    //Set player in his game as ready
    @Args('gameId', { type: () => String }) gameId: string,
    @Args('playerId', { type: () => String }) playerId: string,
    @Args('controls', { type: () => String }) controls: Controls
  ): Promise<boolean> {
    this.pongService.setPlayerInputs(gameId, playerId, controls)
    return false //TODO update return
  }
}
