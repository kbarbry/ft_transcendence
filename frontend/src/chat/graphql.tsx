import { gql } from '@apollo/client'

export const privateMessageCreation = gql`
  subscription privateMessageCreation {
    privateMessageCreation {
      content
      createdAt
      senderId
      id
    }
  }
`
