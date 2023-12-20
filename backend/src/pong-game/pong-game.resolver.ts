import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { PongGame } from './entities/pong-game.entity'
import { PongGameService } from './pong-game.service'
import { ControlsInput } from './dto/player-controls.input'
import { EGameType } from '@prisma/client'
import { GameInvitation } from './entities/game-invitation.entity'
import { NanoidValidationPipe } from 'src/common/pipes/nanoid.pipe'
import {
  AuthorizationGuard,
  Unprotected
} from 'src/auth/guards/authorization.guard'
import { UseGuards } from '@nestjs/common'

@Resolver(() => PongGame)
@UseGuards(AuthorizationGuard)
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
  @Unprotected()
  matchmakingNotification(
    @Args('playerId', { type: () => String }) playerId: string
  ) {
    const triggerName = 'queue' + playerId
    return this.pubSub.asyncIterator(triggerName)
  }

  @Subscription(() => PongGame, {
    resolve: (payload) => (payload?.data !== undefined ? payload.data : null)
  })
  @Unprotected()
  pongData(@Args('gameId', { type: () => String }) gameId: string) {
    return this.pubSub.asyncIterator(gameId)
  }

  @Subscription(() => GameInvitation, {
    resolve: (payload) => (payload?.data !== undefined ? payload.data : null)
  })
  @Unprotected()
  pongInvitationSubcription(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string
  ) {
    return this.pubSub.asyncIterator('gameInvitation' + userId)
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
    const gameId: string | null = await this.pongService.sendPongInvitation(
      gameType,
      senderNickname,
      senderId,
      receiverNickname
    )
    return gameId
  }

  @Mutation(() => Boolean)
  async addPlayerToMatchmakingQueue(
    @Args('playerId', { type: () => String }) playerId: string,
    @Args('nickname', { type: () => String }) nickname: string,
    @Args('gameType', { type: () => EGameType }) gameType: EGameType
  ): Promise<boolean> {
    const isQueued: boolean = await this.pongService.addPlayerToGameQueue({
      id: playerId,
      nickname,
      gameType,
      triggerName: 'queue' + playerId
    })
    if (isQueued) {
      await this.pongService.matchPlayerInQueue(gameType)
    }
    return isQueued
  }

  @Mutation(() => Boolean)
  removePlayerFromMatchmakingQueue(
    @Args('playerId', { type: () => String }) playerId: string
  ): boolean {
    const isRemoved: boolean =
      this.pongService.removePlayerFromMatchmakingQueue(playerId)
    return isRemoved
  }

  @Mutation(() => Boolean)
  async readyForGame(
    @Args('gameId', { type: () => String }) gameId: string,
    @Args('playerId', { type: () => String }) playerId: string
  ): Promise<boolean> {
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

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => Boolean)
  async isGameValid(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('gameId', { type: () => String })
    gameId: string
  ): Promise<boolean> {
    return this.pongService.isGameValid(userId, gameId)
  }

  @Query(() => Boolean)
  isUserInGameQueue(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string
  ): boolean {
    return this.pongService.isPlayerInQueue(userId)
  }

  @Query(() => Boolean)
  isUserReadyInGame(
    @Args('userId', { type: () => String }, NanoidValidationPipe)
    userId: string,
    @Args('gameId', { type: () => String })
    gameId: string
  ): boolean {
    return this.pongService.isUserReadyInGame(userId, gameId)
  }
}
