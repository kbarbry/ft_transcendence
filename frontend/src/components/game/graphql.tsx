import { gql } from '@apollo/client'

export const pongDataSubscription = gql`
  subscription PongData($gameId: String!) {
    pongData(gameId: $gameId) {
      ball {
        hPos
        radius
        vPos
      }
      elapsedTime
      p1racket {
        hPos
        height
        vPos
        width
      }
      p2racket {
        hPos
        height
        vPos
        width
      }
      player1 {
        nickname
        presence
        score
      }
      player2 {
        nickname
        presence
        score
      }
      playfield {
        height
        width
      }
      type
      winner
      message
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

export const leaveGame = gql`
  mutation QuitGame($gameId: String!, $playerId: String!) {
    quitGame(gameId: $gameId, playerId: $playerId)
  }
`

export const isGameValid = gql`
  query IsGameValid($gameId: String!, $userId: String!) {
    isGameValid(gameId: $gameId, userId: $userId)
  }
`
