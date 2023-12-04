import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Friend from './components/Friend'

const Friends: React.FC = () => {
  const friends = useSelector(
    (state: RootState) => state.friendInformations.friends
  )
  return (
    <div>
      <h2>Friends Component</h2>
      {friends && friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            <Friend key={friend.id} />
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
