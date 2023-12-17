import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { EGameType, User } from '@prisma/client'
import { Controls, PongGame, PongPlayer } from './entities/pong-game.entity'
import { CreateGameStatInput } from 'src/game-stat/dto/create-game-stat.input'
import { GameStatService } from 'src/game-stat/game-stat.service'
import { UserService } from 'src/user/user.service'
import { GameInvitation } from './entities/game-invitation.entity'

export type PlayerWaiting = {
  id: string
  nickname: string
  triggerName: string
  gameType: EGameType
}

const gamesMap: Map<string, PongGame> = new Map<string, PongGame>()
const classicQueue: Array<PlayerWaiting> = new Array<PlayerWaiting>()
const specialQueue: Array<PlayerWaiting> = new Array<PlayerWaiting>()

@Injectable()
export class PongGameService {
  constructor(
    private readonly pubsub: PubSub,
    private readonly gamestatService: GameStatService,
    private readonly userService: UserService
  ) {
    setInterval(this.gamesUpdate.bind(this), 20)
  }

  isPlayerInQueue(playerId: string) {
    for (const player of classicQueue) {
      if (player.id === playerId) {
        console.log('isPlayerInQueue return true, id = ' + playerId)
        return true
      }
    }
    for (const player of specialQueue) {
      if (player.id === playerId) {
        console.log('isPlayerInQueue return true, id = ' + playerId)
        return true
      }
    }
    console.log('isPlayerInQueue return false, id = ' + playerId)
    return false
  }

  isGameValid(userId: string, gameId: string) {
    const game = gamesMap.get(gameId)
    if (game === undefined) {
      return false
    }
    if (game.player1.id !== userId && game.player2.id !== userId) {
      return false
    }
    return true
  }

  isUserReadyInGame(userId: string, gameId: string): boolean {
    const game = gamesMap.get(gameId)
    if (game === undefined) {
      return false
    }
    if (game.player1.id === userId) {
      return game.player1.presence
    }
    if (game.player2.id === userId) {
      return game.player2.presence
    }
    return false
  }

  async sendPongInvitation(
    gameType: EGameType,
    senderNickname: string,
    senderId: string,
    receiverNickname: string
  ): Promise<string | null> {
    const invitedUser: User | null = await this.userService.findOneByUsername(
      receiverNickname
    )
    if (invitedUser === null) {
      return null
    }
    const inviteGame = this.gameInit(
      gameType,
      'invite' + senderId + invitedUser.id,
      senderNickname,
      senderId,
      invitedUser.username,
      invitedUser.id
    )
    if (inviteGame === undefined) {
      return null
    }
    const invitation: GameInvitation = {
      gameId: inviteGame.gameId,
      gameType: inviteGame.type,
      senderNickname: senderNickname
    }
    this.pubsub.publish('gameInvitation' + invitedUser.username, {
      data: invitation
    })
    return inviteGame.gameId
  }

  async addPlayerToGameQueue(playerWaiting: PlayerWaiting): Promise<boolean> {
    if (this.isPlayerInQueue(playerWaiting.id)) {
      console.log(
        'Service: addPlayerToGameQueue: player already in queue : ' +
          playerWaiting.nickname
      )
      return true
    }
    let size = 0
    switch (playerWaiting.gameType) {
      case EGameType.Classic:
        size = classicQueue.push(playerWaiting)
        break
      case EGameType.Special:
        size = specialQueue.push(playerWaiting)
        break
      default:
        size = -1
    }
    if (size > 0) {
      return true
    }
    return false
  }

  removePlayerFromMatchmakingQueue(playerId: string) {
    let index = classicQueue.findIndex((player) => player.id === playerId)
    if (index !== -1) {
      classicQueue.splice(index, 1)
      console.log('return true')
      return true
    }
    index = specialQueue.findIndex((player) => player.id === playerId)
    if (index !== -1) {
      specialQueue.splice(index, 1)
      console.log('return true')
      return true
    }
    console.log('return false')
    return false
  }

  async matchClassicqQueue() {
    console.log(
      'Service: matchClassicQueue: playerQueue = ' +
        JSON.stringify(classicQueue, undefined, 2)
    )
    if (classicQueue.length >= 2) {
      const player1 = classicQueue.pop()
      const player2 = classicQueue.pop()
      console.log(
        'Service: matchClassicQueue: player1 = ' +
          JSON.stringify(player1, undefined, 2)
      )
      console.log(
        'Service: matchClassicQueue: player2 = ' +
          JSON.stringify(player2, undefined, 2)
      )
      const gameId = 'matchClassic' + player1?.id + player2?.id

      if (player1 === undefined || player2 === undefined) {
        return null
      }
      console.log('Service: matchClassicQueue: gameid = ' + gameId)
      this.gameInit(
        EGameType.Classic,
        gameId,
        player1.nickname,
        player1.id,
        player2.nickname,
        player2.id
      )
      await this.pubsub.publish(player1.triggerName, {
        data: gameId
      })
      await this.pubsub.publish(player2.triggerName, {
        data: gameId
      })
      return gameId
    }
    return null
  }

  async matchSpecialQueue(): Promise<string | null> {
    console.log(
      'Service: matchSpecialQueue: playerQueue = ' +
        JSON.stringify(specialQueue, undefined, 2)
    )
    if (specialQueue.length >= 2) {
      const player1 = specialQueue.pop()
      const player2 = specialQueue.pop()
      console.log(
        'Service: matchSpecialQueue: player1 = ' + JSON.stringify(player1)
      )
      console.log(
        'Service: matchSpecialQueue: player2 = ' + JSON.stringify(player2)
      )
      const gameId = 'matchSpecial' + player1?.id + player2?.id

      if (player1 === undefined || player2 === undefined) {
        return null
      }

      console.log('Service: matchSpecialQueue: gameid = ' + gameId)
      this.gameInit(
        EGameType.Special,
        gameId,
        player1.nickname,
        player1.id,
        player2.nickname,
        player2.id
      )
      await this.pubsub.publish(player1.triggerName, {
        data: gameId
      })
      await this.pubsub.publish(player2.triggerName, {
        data: gameId
      })
      return gameId
    }
    return null
  }

  async matchPlayerInQueue(type: EGameType): Promise<string | null> {
    let res: string | null = null

    switch (type) {
      case EGameType.Classic:
        res = await this.matchClassicqQueue()
        console.log('match classic queue')
        break
      case EGameType.Special:
        res = await this.matchSpecialQueue()
        console.log('match special queue')
        break
    }
    return res
  }

  setPresenceInGame(gameId: string, playerId: string, presence: boolean) {
    const game: PongGame | undefined = gamesMap.get(gameId)
    if (game === undefined) {
      return false
    }
    if (game.player1.id === playerId) {
      game.player1.presence = presence
    } else if (game.player2.id === playerId) {
      game.player2.presence = presence
    }
    if (game.player1.presence === true && game.player2.presence === true) {
      game.isRunning = true
    } else {
      game.isRunning = false
    }
    return true
  }

  async quitGame(gameId: string, playerId: string) {
    const game: PongGame | undefined = gamesMap.get(gameId)
    let leftPlayerNickname: string
    if (game === undefined) {
      return false
    }
    if (game.player1.id === playerId) {
      game.winner = game.player2.nickname
      leftPlayerNickname = game.player1.nickname
    } else if (game.player2.id === playerId) {
      game.winner = game.player1.nickname
      leftPlayerNickname = game.player2.nickname
    } else {
      return false
    }
    game.isRunning = false
    game.message = 'Player ' + leftPlayerNickname + ' has left the game.'
    await this.pubsub.publish(game.gameId, { data: game })
    if (game.player1.score === 0 && game.player2.score === 0) {
      gamesMap.delete(gameId)
      return true
    }
    let winnerPLayer: PongPlayer
    let loserPLayer: PongPlayer
    if (game.winner === game.player1.nickname) {
      winnerPLayer = game.player1
      loserPLayer = game.player2
    } else {
      winnerPLayer = game.player2
      loserPLayer = game.player1
    }
    const data: CreateGameStatInput = {
      type: game.type,
      winnerId: winnerPLayer.id,
      scoreWinner: winnerPLayer.score,
      loserId: loserPLayer.id,
      scoreLoser: loserPLayer.score,
      timePlayed: game.elapsedTime / 1000
    }
    await this.gamestatService.create(data)
    await this.userService.incrementLevel(winnerPLayer.id, 0.3)
    gamesMap.delete(gameId)
    return true
  }

  gameInit(
    type: EGameType,
    gameId: string,
    p1nick: string,
    p1Id: string,
    p2nick: string,
    p2Id: string
  ): PongGame | undefined {
    gamesMap.set(gameId, new PongGame(type, gameId, p1nick, p1Id, p2nick, p2Id))
    return gamesMap.get(gameId)
  }

  setPlayerInputs(gameId: string, playerId: string, controls: Controls) {
    const game = gamesMap.get(gameId)
    if (game === undefined) {
      return false
    }
    if (game.player1.id === playerId) {
      game.player1.controls = controls
      return true
    }
    if (game.player2.id === playerId) {
      game.player2.controls = controls
      return true
    }
    return false
  }

  async gamesUpdate() {
    for (const [gameId, game] of gamesMap) {
      if (!game.isRunning) {
        //TODO check for how many time the game is innactive and delete it if needed
        continue
      }
      game.update()
      await this.pubsub.publish(game.gameId, { data: game })
      if (game.winner) {
        let winnerPLayer: PongPlayer
        let loserPLayer: PongPlayer
        if (game.winner === game.player1.nickname) {
          winnerPLayer = game.player1
          loserPLayer = game.player2
        } else {
          winnerPLayer = game.player2
          loserPLayer = game.player1
        }
        const data: CreateGameStatInput = {
          type: game.type,
          winnerId: winnerPLayer.id,
          scoreWinner: winnerPLayer.score,
          loserId: loserPLayer.id,
          scoreLoser: loserPLayer.score,
          timePlayed: game.elapsedTime / 1000
        }
        await this.gamestatService.create(data)
        await this.userService.incrementLevel(winnerPLayer.id, 0.3)
        gamesMap.delete(gameId)
      }
    }
  }
}
