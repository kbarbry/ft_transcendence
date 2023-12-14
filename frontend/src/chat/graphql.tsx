import { gql } from '@apollo/client'

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
export const subscriptionOnMessageCreation = gql`
  subscription PrivateMessageCreation(
    $receiverId: String!
    $senderId: String!
  ) {
    privateMessageCreation(receiverId: $receiverId, senderId: $senderId) {
      content
      createdAt
      id
      receiverId
      senderId
      updatedAt
    }
  }
`

export const subscriptionOnMessageEdition = gql`
  subscription PrivateMessageEdition($receiverId: String!, $senderId: String!) {
    privateMessageEdition(receiverId: $receiverId, senderId: $senderId) {
      content
      createdAt
      id
      receiverId
      senderId
      updatedAt
    }
  }
`

export const subscriptionOnMessageDeletion = gql`
  subscription PrivateMessageDeletion(
    $receiverId: String!
    $senderId: String!
  ) {
    privateMessageDeletion(receiverId: $receiverId, senderId: $senderId) {
      content
      id
      receiverId
      senderId
      updatedAt
      createdAt
    }
  }
`

export const subscriptionOnChannelMessageCreation = gql`
  subscription ChannelMessageCreation($channelId: String!) {
    channelMessageCreation(channelId: $channelId) {
      channelId
      content
      createdAt
      id
      senderId
      updatedAt
    }
  }
`

export const subscriptionOnChannelMessageEdition = gql`
  subscription ChannelMessageEdition($channelId: String!) {
    channelMessageEdition(channelId: $channelId) {
      channelId
      content
      createdAt
      id
      senderId
      updatedAt
    }
  }
`

export const subscriptionOnChannelMessageDeletion = gql`
  subscription ChannelMessageDeletion($channelId: String!) {
    channelMessageDeletion(channelId: $channelId) {
      channelId
      content
      createdAt
      id
      senderId
      updatedAt
    }
  }
`

//**************************************************//
//  MUTATION
//**************************************************//
export const mutationCreatePrivateMessage = gql`
  mutation CreatePrivateMessage($data: CreatePrivateMessageInput!) {
    createPrivateMessage(data: $data) {
      content
      id
      receiverId
      senderId
      updatedAt
      createdAt
    }
  }
`

export const mutationUpdatePrivateMessage = gql`
  mutation UpdatePrivateMessage(
    $data: UpdatePrivateMessageInput!
    $updatePrivateMessageId: String!
  ) {
    updatePrivateMessage(data: $data, id: $updatePrivateMessageId) {
      content
      createdAt
      id
      receiverId
      senderId
      updatedAt
    }
  }
`

export const mutationDeletePrivateMessage = gql`
  mutation DeletePrivateMessage($deletePrivateMessageId: String!) {
    deletePrivateMessage(id: $deletePrivateMessageId) {
      id
    }
  }
`

export const mutationCreateChannel = gql`
  mutation CreateChannel($data: CreateChannelInput!) {
    createChannel(data: $data) {
      id
    }
  }
`

export const mutationDeleteChannel = gql`
  mutation DeleteChannel($deleteChannelId: String!) {
    deleteChannel(id: $deleteChannelId) {
      id
    }
  }
`

export const mutationCreateChannelMessage = gql`
  mutation CreateChannelMessage($data: CreateChannelMessageInput!) {
    createChannelMessage(data: $data) {
      channelId
      content
      createdAt
      id
      senderId
      updatedAt
    }
  }
`

export const mutationUpdateChannelMessage = gql`
  mutation UpdateChannelMessage(
    $updateChannelMessageId: String!
    $data: UpdateChannelMessageInput!
  ) {
    updateChannelMessage(id: $updateChannelMessageId, data: $data) {
      channelId
      content
      createdAt
      id
      senderId
      updatedAt
    }
  }
`

export const mutationDeleteChannelMessage = gql`
  mutation DeleteChannelMessage($deleteChannelMessageId: String!) {
    deleteChannelMessage(id: $deleteChannelMessageId) {
      channelId
      content
      createdAt
      id
      senderId
      updatedAt
    }
  }
`

export const mutationCreateChannelMember = gql`
  mutation CreateChannelMember($data: CreateChannelMemberInput!) {
    createChannelMember(data: $data) {
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

export const mutationDeleteChannelMember = gql`
  mutation DeleteChannelMember($userId: String!, $channelId: String!) {
    deleteChannelMember(userId: $userId, channelId: $channelId) {
      userId
      channelId
    }
  }
`

export const mutationMuteChannelMember = gql`
  mutation MuteChannelMember($channelId: String!, $userId: String!) {
    muteChannelMember(channelId: $channelId, userId: $userId) {
      channelId
      muted
      userId
    }
  }
`

export const mutationUnmuteChannelMember = gql`
  mutation UnmuteChannelMember($channelId: String!, $userId: String!) {
    unmuteChannelMember(channelId: $channelId, userId: $userId) {
      channelId
      muted
      userId
    }
  }
`

export const mutationCreateChannelBlocked = gql`
  mutation CreateChannelBlocked($data: CreateChannelBlockedInput!) {
    createChannelBlocked(data: $data) {
      channelId
      userId
    }
  }
`

export const mutationDeleteChannelBlocked = gql`
  mutation DeleteChannelBlocked($channelId: String!, $userId: String!) {
    deleteChannelBlocked(channelId: $channelId, userId: $userId) {
      channelId
      userId
    }
  }
`

export const mutationCreateChannelInvited = gql`
  mutation CreateChannelInvited($data: CreateChannelInvitedInput!) {
    createChannelInvited(data: $data) {
      channelId
      userId
    }
  }
`

export const mutationDeleteChannelInvited = gql`
  mutation DeleteChannelInvited($channelId: String!, $userId: String!) {
    deleteChannelInvited(channelId: $channelId, userId: $userId) {
      channelId
      userId
    }
  }
`

//**************************************************//
//  QUERY
//**************************************************//
export const queryFindAllPrivateMessageWith = gql`
  query FindAllPrivateMessageWith($receiverId: String!, $senderId: String!) {
    findAllPrivateMessageWith(receiverId: $receiverId, senderId: $senderId) {
      content
      createdAt
      id
      senderId
      receiverId
      updatedAt
    }
  }
`

export const queryFindAllChannelMessageInChannel = gql`
  query FindAllChannelMessageInChannel($channelId: String!) {
    findAllChannelMessageInChannel(channelId: $channelId) {
      channelId
      content
      createdAt
      id
      senderId
      updatedAt
    }
  }
`

export const queryFindOneChannelByName = gql`
  query FindOneChannelByName($name: String!) {
    findOneChannelByName(name: $name) {
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
