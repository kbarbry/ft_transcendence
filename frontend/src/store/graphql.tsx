import { gql } from '@apollo/client'

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

export const findAllRelationRequest = gql`
  query FindAllRelationRequest($userSenderId: String!) {
    findAllRelationRequestsSent(userSenderId: $userSenderId)
  }
`

export const findAllRelationBlocked = gql`
  query FindAllRelationBlocked($findAllRelationBlockedByUserId: String!) {
    findAllRelationBlockedByUser(id: $findAllRelationBlockedByUserId)
  }
`
