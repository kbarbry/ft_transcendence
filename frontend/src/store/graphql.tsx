import { gql } from '@apollo/client'

//**************************************************//
//  QUERY
//**************************************************//

export const findUserByContext = gql`
  query FindOneUserByContext {
    findOneUserByContext {
      avatarUrl
      id
      languages
      level
      mail
      status
      username
    }
  }
`

export const findUsersByUserIds = gql`
  query FindUsersByUserIds($userIds: [String!]!) {
    findUsersByUserIds(userIds: $userIds) {
      avatarUrl
      id
      languages
      level
      mail
      status
      username
    }
  }
`

export const findAllRelationFriend = gql`
  query FindAllRelationFriend($findAllRelationFriendId: String!) {
    findAllRelationFriend(id: $findAllRelationFriendId)
  }
`

export const findAllRelationRequestsSent = gql`
  query FindAllRelationRequestsSent($userSenderId: String!) {
    findAllRelationRequestsSent(userSenderId: $userSenderId)
  }
`

export const findAllRelationRequestsReceived = gql`
  query FindAllRelationRequestsReceived($userReceiverId: String!) {
    findAllRelationRequestsReceived(userReceiverId: $userReceiverId)
  }
`

export const findAllRelationBlocked = gql`
  query FindAllRelationBlocked($findAllRelationBlockedByUserId: String!) {
    findAllRelationBlockedByUser(id: $findAllRelationBlockedByUserId)
  }
`
