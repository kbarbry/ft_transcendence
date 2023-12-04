import { gql } from '@apollo/client'

//**************************************************//
//  QUERY
//**************************************************//

export const queryIsUserUsernameUsed = gql`
  query Query($username: String!) {
    isUserUsernameUsed(username: $username)
  }
`

export const queryIsUserMailUser = gql`
  query Query($mail: String!) {
    isUserMailUsed(mail: $mail)
  }
`
