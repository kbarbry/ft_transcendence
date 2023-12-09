import { gql } from '@apollo/client'

export const pongDataSubscription = gql`
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
      player1 {
        controls {
          Down_Key
          S_Key
          Up_Key
          Z_Key
        }
        id
        nickname
        presence
        score
      }
      player2 {
        id
        nickname
        presence
        score
      }
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
export const updatePlayerInputs = gql`
  mutation UpdatePlayerInputs(
    $controls: ControlsInput!
    $gameId: String!
    $playerId: String!
  ) {
    updatePlayerInputs(
      controls: $controls
      gameId: $gameId
      playerId: $playerId
    )
  }
`
