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
