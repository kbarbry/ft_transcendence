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
