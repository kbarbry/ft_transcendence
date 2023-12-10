import { gql } from '@apollo/client'

//**************************************************//
//  MUTATION
//**************************************************//

export const deleteRelationBlocked = gql`
  mutation DeleteRelationBlocked($userAId: String!, $userBId: String!) {
    deleteRelationBlocked(userAId: $userAId, userBId: $userBId) {
      userBlockedId
      userBlockingId
    }
  }
`

export const deleteRelationFriend = gql`
  mutation DeleteRelationFriend($userAId: String!, $userBId: String!) {
    deleteRelationFriend(userAId: $userAId, userBId: $userBId) {
      userAId
      userBId
    }
  }
`

export const createRelationBlocked = gql`
  mutation CreateRelationBlocked($data: RelationBlockedInput!) {
    createRelationBlocked(data: $data) {
      userBlockedId
      userBlockingId
    }
  }
`

export const createRelationRequest = gql`
  mutation CreateRelationRequests($data: RelationRequestsInput!) {
    createRelationRequests(data: $data) {
      userReceiverId
      userSenderId
    }
  }
`

export const deleteRelationRequest = gql`
  mutation DeleteRelationRequests(
    $userReceiverId: String!
    $userSenderId: String!
  ) {
    deleteRelationRequests(
      userReceiverId: $userReceiverId
      userSenderId: $userSenderId
    ) {
      userReceiverId
      userSenderId
    }
  }
`

//**************************************************//
//  QUERY
//**************************************************//

export const findOneUserByUsername = gql`
  query FindOneUserByUsername($username: String!) {
    findOneUserByUsername(username: $username) {
      id
      username
    }
  }
`
