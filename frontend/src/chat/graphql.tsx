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
