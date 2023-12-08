import { gql } from '@apollo/client'

export const getId = gql`
  query GetId {
    findOneUserByContext {
      id
      validation2fa
    }
  }
`
