import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks'
import PrivateChannel from './components/PrivateChannel'
import { User } from '../gql/graphql'
import { Button, Divider, Empty, List, Space, Row, Col } from 'antd'
import { useLocation } from 'wouter'

const PrivateChannels: React.FC = () => {
  const friends = useAppSelector((state) => state.friendInformations.friends)
  const userInfos = useAppSelector((state) => state.userInformations.user)
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null)
  const [, setLocation] = useLocation()

  if (!userInfos || !friends) throw new Error()

  if (
    selectedFriend &&
    !friends.find((friend) => friend.id === selectedFriend.id)
  ) {
    setSelectedFriend(null)
  }

  const handleOnAddFriendClick = () => {
    setLocation('/relations')
  }

  return (
    <Row gutter={[16, 16]} style={{ height: '100%' }}>
      <Col span={6} style={{ height: '100%' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <h2
            style={{
              marginBottom: '0px',
              textAlign: 'center'
            }}
          >
            Private Message
          </h2>
          <Divider />
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
        </Space>
      </Col>
      <Col span={1} style={{ height: '100%' }}>
        <Divider
          type='vertical'
          style={{ height: '100%', marginLeft: '50%' }}
        />
      </Col>
      <Col
        span={17}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {selectedFriend ? (
          <PrivateChannel
            userInfos={userInfos}
            friends={friends}
            friendId={selectedFriend.id}
            key={selectedFriend.id}
          />
        ) : (
          <Empty
            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
            imageStyle={{ height: 100 }}
            description={
              <span>
                Select a chat
                <Divider>or</Divider>
                <Button type='dashed' onClick={handleOnAddFriendClick}>
                  add friend
                </Button>
              </span>
            }
          />
        )}
      </Col>
    </Row>
  )
}

export default PrivateChannels
