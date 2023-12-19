import { gql } from '@apollo/client'

//**************************************************//
//  QUERY
//**************************************************//

export const queryFindOneUserStatus = gql`
  query FindOneUserStatus($findOneUserId: String!) {
    findOneUser(id: $findOneUserId) {
      status
      id
    }
  }
`

export const queryFindOneUserPresence = gql`
  query FindLastUserPresenceByUserId($findLastUserPresenceByUserIdId: String!) {
    findLastUserPresenceByUserId(id: $findLastUserPresenceByUserIdId) {
      userId
      disconnectedAt
      connectedAt
    }
  }
`
