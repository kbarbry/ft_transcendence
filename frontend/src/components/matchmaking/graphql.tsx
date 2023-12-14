import { gql } from '@apollo/client'

export const matchmakingNotification = gql`
  subscription matchmakingNotification($playerId: String!) {
    matchmakingNotification(playerId: $playerId)
  }
`
export const addPlayerToMatchmakingQueue = gql`
  mutation AddPlayerToMatchmakingQueue(
    $gameType: EGameType!
    $nickname: String!
    $playerId: String!
  ) {
    addPlayerToMatchmakingQueue(
      gameType: $gameType
      nickname: $nickname
      playerId: $playerId
    )
  }
`
