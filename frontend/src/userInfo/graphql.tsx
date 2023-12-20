import { gql } from '@apollo/client'

export const queryIsUserUsernameUsed = gql`
  query Query($username: String!) {
    isUserUsernameUsed(username: $username)
  }
`

export const mutationUpdateUser = gql`
  mutation UpdateUser($id: String!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
    }
  }
`
