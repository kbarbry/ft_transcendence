import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { MatchmakingOponentInfo } from './entities/matchmaking-oponent.entity'
import { Controls, PongGame } from './entities/pong-game.entity'

export class PlayerWaiting {
  id = ''
  nickname = ''
  triggerName = ''
}

const gamesMap: Map<string, PongGame> = new Map<string, PongGame>()
const playerQueue: Array<PlayerWaiting> = new Array<PlayerWaiting>()

@Injectable()
export class PongGameService {
  constructor(private readonly pubsub: PubSub) {
    setInterval(this.gamesUpdate, 1000)
  }

  async addPlayerToGameQueue(playerWaiting: PlayerWaiting): Promise<boolean> {
    if (playerQueue.indexOf(playerWaiting) !== -1) {
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
      this.gameInit(gameId, player1.nickname, player2.nickname)
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

  setPresenceInGame(gameId: string, playerId: string) {
    const game: PongGame | undefined = gamesMap.get(gameId)

    //TODO if game not present
    if (game === undefined) {
      return false
    }

    //TODO if already in

    //TODO if game is full

    if (game.player1.id === playerId) {
      game.player1.presence = true
    }
    if (game.player2.id === playerId) {
      game.player2.presence = true
    }
    if (game.player1.presence === true && game.player2.presence === true) {
      game.isRunning = true
    }
    return true
  }

  sendGameInfo(subTopic: string) {
    subTopic = 'matchMaking'
    const gameInfo: MatchmakingOponentInfo = {
      opponentName: 'Bob',
      state: true
    }
    this.pubsub.publish(subTopic, { data: gameInfo })
  }

  //Init a new game with gameId and add it to the gamesMap
  gameInit(
    gameId: string,
    p1nick: string,
    p2nick: string
  ): PongGame | undefined {
    gamesMap.set(gameId, new PongGame(gameId, p1nick, p2nick))
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

  //update data of every game where gameRunning is true
  gamesUpdate() {
    for (const [gameId, game] of gamesMap) {
      console.log('Service: gamesUpdate: ')
      if (!game.isRunning) {
        console.log('Service: gamesUpdate: continue')
        continue
      }
      console.log(
        'Service: gamesUpdate: ' + gameId + ' = ' + JSON.stringify(game)
      )
      game.update()
      this.pubsub.publish(game.gameId, game)
    }
  }
}