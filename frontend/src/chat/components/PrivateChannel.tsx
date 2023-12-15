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
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
      <div style={{ display: 'flex', height: '100%' }}>
        <div
          style={{
            width: '70%',
            padding: '0px',
            borderRight: '1px solid #333'
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
            {friend.username}
          </h2>
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
        </div>
        <div
          style={{
            width: '30%',
            padding: '0px 0px 0px 20px'
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
            Members
          </h2>
          <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
            <PrivateProfile member={userInfos} key={userInfos.id} />
            <PrivateProfile member={friend} key={friendId} />
          </div>
        </div>
      </div>
    )
  } catch (Error) {
    const error_message = (Error as Error).message
    setIsError(true)
    setErrorMessage(error_message)
    return <PopUpError message={'Private channel error'} />
  }
}

export default PrivateChannel
