// findUser.tsx
import { useQuery, gql } from '@apollo/client'
import React from 'react'

export const FindUser: React.FC = () => {
  const Find_user = gql`
    query Query {
      findOneUserByContext {
        username
        mail
      }
    }
  `

  const { loading, error, data } = useQuery(Find_user)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (data) return <div>Data: {JSON.stringify(data)}</div>
}

export default FindUser
