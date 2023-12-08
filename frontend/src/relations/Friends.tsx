import React from 'react'
import Friend from './components/Friend'
import { User } from '../gql/graphql'

interface FriendsProps {
  userId: string
  friends: User[]
}

const Friends: React.FC<FriendsProps> = React.memo(({ userId, friends }) => {
  return (
    <div>
      <h2>Friends Component</h2>
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            <Friend key={friend.id} friend={friend} userId={userId} />
          ))}
          <ul />
        </ul>
      ) : (
        <p>No friend yet</p>
      )}
    </div>
  )
})

export default Friends
