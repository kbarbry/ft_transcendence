import React from 'react'
import Friend from './components/Friend'
import { useAppSelector } from '../store/hooks'

const Friends: React.FC = () => {
  const friends = useAppSelector((state) => state.friendInformations.friends)
  return (
    <div>
      <h2>Friends Component</h2>
      {friends && friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            <Friend key={friend.id} friend={friend} />
          ))}
          <ul />
        </ul>
      ) : (
        <p>No friend yet</p>
      )}
    </div>
  )
}

export default Friends
