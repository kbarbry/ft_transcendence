import { gql } from '@apollo/client'

export const findBestUsers = gql`
  query FindBestUsers {
    findBestUsers {
      avatarUrl
      username
      level
    }
  }
`
