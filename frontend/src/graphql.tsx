import { gql } from '@apollo/client'

//**************************************************//
//  SUBSCRIPTION
//**************************************************//

export const subscriptionOnBlockedReceived = gql`
  subscription RelationBlockedCreation($userId: String!) {
    relationBlockedCreation(userId: $userId) {
      userBlockedId
      userBlockingId
    }
  }
`
