import { gql } from '@apollo/client'

export const matchmakingNotification = gql`
  subscription matchmakingNotification($playerId: String!) {
    matchmakingNotification(playerId: $playerId)
  }
`
export const addPlayerToMatchmakingQueue = gql`
  mutation addPlayerToMatchmakingQueue($nickname: String!, $playerId: String!) {
    addPlayerToMatchmakingQueue(nickname: $nickname, playerId: $playerId)
  }
`
