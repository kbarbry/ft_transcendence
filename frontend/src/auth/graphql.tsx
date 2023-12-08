import { gql } from '@apollo/client'

//**************************************************//
//  QUERY
//**************************************************//

export const queryIsUserUsernameUsed = gql`
  query IsUserUsernameUsed($username: String!) {
    isUserUsernameUsed(username: $username)
  }
`

export const queryIsUserMailUsed = gql`
  query IsUserMailUsed($mail: String!) {
    isUserMailUsed(mail: $mail)
  }
`
