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

export const isPlayerQueued = gql`
  query IsUserInGameQueue($userId: String!) {
    isUserInGameQueue(userId: $userId)
  }
`
