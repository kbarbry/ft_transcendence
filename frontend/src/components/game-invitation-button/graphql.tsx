import { gql } from '@apollo/client'

export const gameInvitationSubscription = gql`
  subscription PongInvitationSubcription($userId: String!) {
    pongInvitationSubcription(userId: $userId) {
      gameId
      gameType
      senderNickname
    }
  }
`

export const gameInvitationMutation = gql`
  mutation SendPongInvitation(
    $gameType: EGameType!
    $receiverNickname: String!
    $senderId: String!
    $senderNickname: String!
  ) {
    sendPongInvitation(
      gameType: $gameType
      receiverNickname: $receiverNickname
      senderId: $senderId
      senderNickname: $senderNickname
    )
  }
`
