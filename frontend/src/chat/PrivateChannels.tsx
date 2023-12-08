import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks'
import PrivateChannel from './components/PrivateChannel'
import { UserInformations } from '../store/slices/user-informations.slice'

const PrivateChannels: React.FC = () => {
  const friends = useAppSelector((state) => state.friendInformations.friends)

  const [selectedFriend, setSelectedFriend] = useState<UserInformations | null>(
    null
  )

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '200px', marginRight: '20px' }}>
          <h2>Direct Messages</h2>
          <ul>
            {friends &&
              friends.map((friend) => (
                <li key={friend.id}>
                  <button onClick={() => setSelectedFriend(friend)}>
                    {friend.username}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div>
          {selectedFriend ? (
            <PrivateChannel friend={selectedFriend} />
          ) : (
            <p>select a friend to start chatting</p>
          )}
        </div>
      </div>
    </>
  )
}

export default PrivateChannels
