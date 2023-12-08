import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks'
import PrivateChannel from './components/PrivateChannel'
import { User } from '../gql/graphql'

const PrivateChannels: React.FC = () => {
  const friends = useAppSelector((state) => state.friendInformations.friends)
  const userInfos = useAppSelector((state) => state.userInformations.user)
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null)

  if (!userInfos || !friends) throw new Error()

  if (
    selectedFriend &&
    !friends.find((friend) => friend.id === selectedFriend.id)
  ) {
    setSelectedFriend(null)
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '200px', marginRight: '20px' }}>
          <h2>Direct Messages</h2>
          <ul>
            {friends.map((friend) => (
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
            <PrivateChannel
              key={selectedFriend.id}
              userInfos={userInfos}
              friend={selectedFriend}
            />
          ) : (
            <p>select a friend to start chatting</p>
          )}
        </div>
      </div>
    </>
  )
}

export default PrivateChannels
