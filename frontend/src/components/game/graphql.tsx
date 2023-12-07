import { gql } from '@apollo/client'

export const pongData = gql`
  subscription PongData($gameId: String!) {
    pongData(gameId: $gameId) {
      ball {
        hPos
        radius
        vPos
      }
      creationTimestamp
      gameId
      isRunning
      p1racket {
        hPos
        height
        vPos
        velocity
        width
      }
      p2racket {
        hPos
        height
        vPos
        velocity
        width
      }
      player1
      player2
      playfield {
        height
        width
      }
      time
      winner
    }
  }
`
export const readyForGame = gql`
  mutation readyForGame($gameId: String!, $playerId: String!) {
    readyForGame(gameId: $gameId, playerId: $playerId)
  }
`
