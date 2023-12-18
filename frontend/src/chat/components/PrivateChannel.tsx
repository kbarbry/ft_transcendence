import React, { useState } from 'react'
import {
  FindAllPrivateMessageWithQuery,
  FindAllPrivateMessageWithQueryVariables,
  PrivateMessage,
  User
} from '../../gql/graphql'
import { useQuery } from '@apollo/client'
import { queryFindAllPrivateMessageWith } from '../graphql'
import PrivateChat from './PrivateChat'
import PrivateProfile from './PrivateProfile'
import PopUpError from '../../ErrorPages/PopUpError'
import { Space, Row, Col, Divider } from 'antd'
import { useMediaQuery } from 'react-responsive'

interface PrivateChannelProps {
  userInfos: User
  friends: User[]
  friendId: string
}

const PrivateChannel: React.FC<PrivateChannelProps> = ({
  userInfos,
  friends,
  friendId
}) => {
  const [chat, setChat] = useState<PrivateMessage[]>([])
  const friend = friends.find((friend) => friend.id === friendId)
  const [, setIsError] = useState(false)
  const [, setErrorMessage] = useState('')

  const isSmallScreen = useMediaQuery({ maxWidth: 768 })

  if (!friend) throw new Error()

  try {
    const { loading, error } = useQuery<
      FindAllPrivateMessageWithQuery,
      FindAllPrivateMessageWithQueryVariables
    >(queryFindAllPrivateMessageWith, {
      variables: {
        receiverId: friendId,
        senderId: userInfos.id
      },
      fetchPolicy: 'network-only',
      onCompleted: (result) => {
        setChat([...result.findAllPrivateMessageWith].reverse() || [])
      }
    })

    return (
      <Row gutter={[16, 16]} style={{ height: '100%', width: '100%' }}>
        <Col span={isSmallScreen ? 24 : 18}>
          <Space direction='vertical'>
            <h2>{friend.username}</h2>
            {loading && <p>Loading conversation...</p>}
            {error && (
              <p>
                Error loading conversation, please try later. You can still use
                the chat.
              </p>
            )}
            <PrivateChat
              userInfos={userInfos}
              friends={friends}
              friendId={friendId}
              chatState={{ chat, setChat }}
              key={userInfos.id + friend.id}
            />
          </Space>
        </Col>

        {!isSmallScreen && (
          <>
            <Col span={1} style={{ height: '100%' }}>
              <Divider
                type='vertical'
                style={{ height: '100%', marginLeft: '50%' }}
              />
            </Col>
            <Col span={5} style={{ height: '100%' }}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <h2
                  style={{
                    marginBottom: '0px',
                    textAlign: 'center'
                  }}
                >
                  Members
                </h2>
                <Divider
                  style={{ height: '10px', margin: '0px', marginTop: '10px' }}
                />
                <div style={{ overflowX: 'hidden' }}>
                  <PrivateProfile
                    userId={userInfos.id}
                    member={userInfos}
                    key={userInfos.id}
                  />
                  <PrivateProfile
                    userId={userInfos.id}
                    member={friend}
                    key={friendId}
                  />
                </div>
              </Space>
            </Col>
          </>
        )}
      </Row>
    )
  } catch (Error) {
    const error_message = (Error as Error).message
    setIsError(true)
    setErrorMessage(error_message)
    return <PopUpError message={'Private channel error'} />
  }
}

export default PrivateChannel
