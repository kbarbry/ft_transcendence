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

export const subscriptionOnFriendDeleted = gql`
  subscription RelationFriendDeleted($userId: String!) {
    relationFriendDeleted(userId: $userId) {
      userAId
      userBId
    }
  }
`

export const subscriptionOnRequestCreated = gql`
  subscription RelationRequestCreation($userId: String!) {
    relationRequestCreation(userId: $userId) {
      userReceiverId
      userSenderId
    }
  }
`

export const subscriptionOnRequestDeleted = gql`
  subscription RelationRequestDeleted($userId: String!) {
    relationRequestDeleted(userId: $userId) {
      userReceiverId
      userSenderId
    }
  }
`
