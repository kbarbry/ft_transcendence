import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { PongGame } from './entities/pong-game.entity'
import { PongGameService } from './pong-game.service'
import { ControlsInput } from './dto/player-controls.input'
import { EGameType } from '@prisma/client'
import { GameInvitation } from './entities/game-invitation.entity'

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

  @Subscription(() => GameInvitation, {
    resolve: (payload) => (payload?.data !== undefined ? payload.data : null)
  })
  pongInvitationSubcription(
    @Args('nickname', { type: () => String })
    nickname: string
  ) {
    console.log('PongGameResolver:  PongInvitationSubcription:')
    return this.pubSub.asyncIterator('gameInvitation' + nickname)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => String, { nullable: true })
  async sendPongInvitation(
    @Args('senderNickname', { type: () => String }) senderNickname: string,
    @Args('senderId', { type: () => String }) senderId: string,
    @Args('receiverNickname', { type: () => String }) receiverNickname: string,
    @Args('gameType', { type: () => EGameType }) gameType: EGameType
  ): Promise<string | null> {
    const invited: string | null = await this.pongService.sendPongInvitation(
      gameType,
      senderNickname,
      senderId,
      receiverNickname
    )
    return invited
  }

  @Mutation(() => Boolean)
  async addPlayerToMatchmakingQueue(
    @Args('playerId', { type: () => String }) playerId: string,
    @Args('nickname', { type: () => String }) nickname: string,
    @Args('gameType', { type: () => EGameType }) gameType: EGameType
  ): Promise<boolean> {
    console.log('Mutation: addPlayerToMatchmakingQueue:')
    const isQueued: boolean = await this.pongService.addPlayerToGameQueue({
      id: playerId,
      nickname,
      gameType,
      triggerName: 'queue' + playerId //TODO change this with game type
    })
    if (isQueued) {
      await this.pongService.matchPlayerInQueue(gameType)
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
    const presenceValidattion = this.pongService.setPresenceInGame(
      gameId,
      playerId,
      true
    )
    return presenceValidattion
  }

  @Mutation(() => Boolean)
  async quitGame(
    @Args('gameId', { type: () => String }) gameId: string,
    @Args('playerId', { type: () => String }) playerId: string
  ): Promise<boolean> {
    console.log(
      'Mutation: quitGame: gameid = ' + gameId + ', playerId = ' + playerId
    )
    const quitValidation = this.pongService.quitGame(gameId, playerId)
    return quitValidation
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
