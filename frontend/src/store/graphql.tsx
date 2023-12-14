import { gql } from '@apollo/client'

//**************************************************//
//  QUERY
//**************************************************//

export const findOneUser = gql`
  query FindOneUser($findOneUserId: String!) {
    findOneUser(id: $findOneUserId) {
      avatarUrl
      createdAt
      id
      languages
      level
      mail
      status
      username
    }
  }
`

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
      createdAt
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
      createdAt
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

export const findAllChannelMemberOfUser = gql`
  query FindAllChannelMemberOfUser($userId: String!) {
    findAllChannelMemberOfUser(userId: $userId) {
      avatarUrl
      channelId
      createdAt
      muted
      nickname
      type
      userId
    }
  }
`

export const findChannelByChannelIds = gql`
  query FindChannelByChannelIds($channelIds: [String!]!) {
    findChannelByChannelIds(channelIds: $channelIds) {
      avatarUrl
      createdAt
      id
      maxUsers
      name
      ownerId
      password
      topic
      type
    }
  }
`

export const findAllChannelMemberInChannel = gql`
  query FindAllChannelMemberInChannel($channelId: String!) {
    findAllChannelMemberInChannel(channelId: $channelId) {
      avatarUrl
      channelId
      createdAt
      muted
      nickname
      type
      userId
    }
  }
`

export const findAllChannelInvitedInChannel = gql`
  query FindAllChannelInvitedInChannel($channelId: String!) {
    findAllChannelInvitedInChannel(channelId: $channelId) {
      channelId
      userId
    }
  }
`

export const findAllChannelBlockedInChannel = gql`
  query FindAllInChannelBlocked($channelId: String!) {
    findAllInChannelBlocked(channelId: $channelId) {
      channelId
      userId
    }
  }
`

export const findOneChannel = gql`
  query FindOneChannel($findOneChannelId: String!) {
    findOneChannel(id: $findOneChannelId) {
      avatarUrl
      createdAt
      id
      maxUsers
      name
      ownerId
      password
      topic
      type
    }
  }
`
