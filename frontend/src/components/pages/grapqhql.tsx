import { gql } from '@apollo/client'

export const testNotifMutation = gql`
  mutation testPongSubscribeMessage($playerId: String!) {
    testPongSubscribeMessage(playerId: $playerId)
  }
`
