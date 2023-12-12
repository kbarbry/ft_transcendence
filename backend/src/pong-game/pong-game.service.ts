import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { EGameType } from '@prisma/client'
import { Controls, PongGame, PongPlayer } from './entities/pong-game.entity'
import { CreateGameStatInput } from 'src/game-stat/dto/create-game-stat.input'
import { GameStatService } from 'src/game-stat/game-stat.service'
import { UserService } from 'src/user/user.service'

export class PlayerWaiting {
  id = ''
  nickname = ''
  triggerName = ''
}

const gamesMap: Map<string, PongGame> = new Map<string, PongGame>()
const playerQueue: Array<PlayerWaiting> = new Array<PlayerWaiting>()

@Injectable()
export class PongGameService {
  constructor(
    private readonly pubsub: PubSub,
    private readonly gamestatService: GameStatService,
    private readonly userService: UserService
  ) {
    setInterval(this.gamesUpdate.bind(this), 20)
  }

  isPlayerInQueue(targetId: string) {
    for (const player of playerQueue) {
      if (player.id == targetId) {
        return true
      }
    }
    return false
  }

  async addPlayerToGameQueue(playerWaiting: PlayerWaiting): Promise<boolean> {
    if (this.isPlayerInQueue(playerWaiting.id)) {
      console.log(
        'Service: addPlayerToGameQueue: player already in queue : ' +
          playerWaiting.nickname
      )
      return true
    }
    const size: number = playerQueue.push(playerWaiting)

    console.log(
      'Service: addPlayerToGameQueue: player queue : ' +
        JSON.stringify(playerQueue)
    )
    if (size > 0) {
      return true
    }
    return false
  }

  async matchPlayerInQueue(): Promise<string | null> {
    //TODO check game number before init a new one
    console.log(
      'Service: matchPlayerInQueue: playerQueue = ' +
        JSON.stringify(playerQueue)
    )
    if (playerQueue.length >= 2) {
      const player1 = playerQueue.pop()
      const player2 = playerQueue.pop()
      console.log(
        'Service: matchPlayerInQueue: player1 = ' + JSON.stringify(player1)
      )
      console.log(
        'Service: matchPlayerInQueue: player2 = ' + JSON.stringify(player2)
      )
      const gameId = 'match' + player1?.id + player2?.id

      if (player1 === undefined || player2 === undefined) {
        return null
      }
      console.log('Service: matchPlayerInQueue: gameid = ' + gameId)
      this.gameInit(
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
    if (game.player1.score === 0 && game.player2.score === 0) {
      game.message = 'Player ' + leftPlayerNickname + 'has left the game.'
      await this.pubsub.publish(game.gameId, { data: game })
      gamesMap.delete(gameId)
    }
    await this.pubsub.publish(game.gameId, { data: game })
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
    gameId: string,
    p1nick: string,
    p1Id: string,
    p2nick: string,
    p2Id: string
  ): PongGame | undefined {
    gamesMap.set(
      gameId,
      new PongGame(EGameType.Classic, gameId, p1nick, p1Id, p2nick, p2Id)
    )
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
