import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { PongGame } from './entities/pong-game.entity'
import { PongGameService } from './pong-game.service'
import { ControlsInput } from './dto/player-controls.input'

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
    console.log('Subscription: pongData:  gameId = ' + gameId)
    return this.pubSub.asyncIterator(gameId)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => String) //TODO delete this mutation
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

  @Mutation(() => String) //TODO delete this mutation
  async testPongDataSubscribtion(
    @Args('gameId', { type: () => String }) gameId: string
  ): Promise<string> {
    const res: PongGame = new PongGame(
      'idTestGame',
      'playerOne',
      'playerOne',
      'playerTwo',
      'playerTwo'
    )

    console.log('Mutation: testPongDataSubscribtion: gameId = ' + gameId)
    await this.pubSub.publish(gameId, { data: res })
    return JSON.stringify(PongGame)
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
    //TODO add presence arg
  ): Promise<boolean> {
    console.log(
      'Mutation: readyForGame: gameid = ' + gameId + ', playerId = ' + playerId
    )
    const presenceValidattion = this.pongService.setPresenceInGame(
      gameId,
      playerId,
      true
    )
    return presenceValidattion
  }

  @Mutation(() => Boolean)
  async updatePlayerInputs(
    @Args('gameId', { type: () => String }) gameId: string,
    @Args('playerId', { type: () => String }) playerId: string,
    @Args('controls', { type: () => ControlsInput }) controls: ControlsInput
  ): Promise<boolean> {
    const isInputUpdated: boolean = this.pongService.setPlayerInputs(
      gameId,
      playerId,
      controls
    )
    return isInputUpdated
  }
}
