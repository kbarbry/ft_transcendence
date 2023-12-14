import React from 'react'
import { findBestUsers } from './graphql'
import { useQuery } from '@apollo/client'
import {
  FindBestUsersQuery,
  FindBestUsersQueryVariables
} from '../../gql/graphql'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'
import { validateAvatarUrl } from '../../store/utils'

export const LeaderboardShowcase: React.FC = () => {
  const { data, loading, error } = useQuery<
    FindBestUsersQuery,
    FindBestUsersQueryVariables
  >(findBestUsers)

  if (loading === true) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>An error occured while loading player leaderboard.</p>
  }
  if (data === undefined) {
    return <p>Nobody has played any games yet.</p>
  }

  const userElements: React.JSX.Element[] = data.findBestUsers.map(
    (user, index) => (
      <li className='showcase-element' key={index}>
        <img
          className='user-picture'
          src={
            user.avatarUrl && validateAvatarUrl(user.avatarUrl) !== undefined
              ? user.avatarUrl
              : DefaultProfilePicture
          }
          alt="User's avatar picture"
        />
        <p>{user.username}</p>
        <p>Level {user.level.toFixed(1)}</p>
      </li>
    )
  )

  return <ul className='showcase'>{userElements}</ul>
}
