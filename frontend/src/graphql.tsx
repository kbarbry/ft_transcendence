import { gql } from '@apollo/client'

//**************************************************//
//  SUBSCRIPTION
//**************************************************//

export const subscriptionOnUserEdited = gql`
  subscription UserEdition($userEditionId: String!) {
    userEdition(id: $userEditionId) {
      id
      username
    }
  }
`

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

export const subscriptionOnChannelEdition = gql`
  subscription ChannelEdition($channelEditionId: String!) {
    channelEdition(id: $channelEditionId) {
      id
    }
  }
`

export const subscriptionOnChannelDeletion = gql`
  subscription ChannelDeletion($channelDeletionId: String!) {
    channelDeletion(id: $channelDeletionId) {
      id
    }
  }
`

export const subscriptionOnChannelMemberCreation = gql`
  subscription ChannelMemberCreation($channelMemberCreationId: String!) {
    channelMemberCreation(id: $channelMemberCreationId) {
      userId
      channelId
    }
  }
`

export const subscriptionOnChannelMemberEdition = gql`
  subscription ChannelMemberEdition($channelMemberEditionId: String!) {
    channelMemberEdition(id: $channelMemberEditionId) {
      channelId
      userId
    }
  }
`

export const subscriptionOnChannelMemberDeletion = gql`
  subscription ChannelMemberDeletion($channelMemberDeletionId: String!) {
    channelMemberDeletion(id: $channelMemberDeletionId) {
      channelId
      userId
    }
  }
`

export const subscriptionOnChannelInvitedCreation = gql`
  subscription ChannelInvitedCreation($channelInvitedCreationId: String!) {
    channelInvitedCreation(id: $channelInvitedCreationId) {
      channelId
      userId
    }
  }
`

export const subscriptionOnChannelInvitedDeletion = gql`
  subscription ChannelInvitedDeletion($channelInvitedDeletionId: String!) {
    channelInvitedDeletion(id: $channelInvitedDeletionId) {
      channelId
      userId
    }
  }
`

export const subscriptionOnChannelBlockedCreation = gql`
  subscription ChannelBlockedCreation($channelBlockedCreationId: String!) {
    channelBlockedCreation(id: $channelBlockedCreationId) {
      channelId
      userId
    }
  }
`

export const subscriptionOnChannelBlockedDeletion = gql`
  subscription ChannelBlockedDeletion($channelBlockedDeletionId: String!) {
    channelBlockedDeletion(id: $channelBlockedDeletionId) {
      channelId
      userId
    }
  }
`
