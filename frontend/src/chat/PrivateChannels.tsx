import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks'
import PrivateChannel from './components/PrivateChannel'
import { User } from '../gql/graphql'
import { Button, List } from 'antd'

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
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div
        style={{
          minWidth: '200px',
          paddingRight: '20px',
          overflowY: 'auto',
          borderRight: '1px solid #333',
          height: '100%'
        }}
      >
        <h2
          style={{
            borderBottom: '1px solid #333',
            paddingBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Private Message
        </h2>
        <List
          dataSource={friends}
          renderItem={(friend) => (
            <List.Item>
              <Button
                type='text'
                block
                style={{
                  height: '50px',
                  border: '1px solid #333',
                  borderRadius: '3px',
                  backgroundColor:
                    selectedFriend && selectedFriend.id === friend.id
                      ? '#333'
                      : 'transparent',
                  transition: 'background-color 0.3s'
                }}
                onClick={() => setSelectedFriend(friend)}
              >
                {friend.username}
              </Button>
            </List.Item>
          )}
        />
      </div>
      <div style={{ flex: 1 }}>
        {selectedFriend ? (
          <PrivateChannel
            userInfos={userInfos}
            friends={friends}
            friendId={selectedFriend.id}
            key={selectedFriend.id}
          />
        ) : (
          <p>select a friend to start chatting</p>
        )}
      </div>
    </div>
  )
}

export default PrivateChannels
