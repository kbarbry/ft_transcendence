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

interface PrivateChannelProps {
  userInfos: User
  friend: User
}

const PrivateChannel: React.FC<PrivateChannelProps> = ({
  userInfos,
  friend
}) => {
  const [chat, setChat] = useState<PrivateMessage[]>([])

  try {
    const { loading, error } = useQuery<
      FindAllPrivateMessageWithQuery,
      FindAllPrivateMessageWithQueryVariables
    >(queryFindAllPrivateMessageWith, {
      variables: {
        receiverId: friend.id,
        senderId: userInfos?.id
      },
      fetchPolicy: 'network-only',
      onCompleted: (result) => {
        setChat([...result.findAllPrivateMessageWith].reverse() || [])
      }
    })

    return (
      <>
        <div>
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
            receiver={friend}
            chatState={{ chat, setChat }}
            key={userInfos.id + friend.id}
          />
        </div>
      </>
    )
  } catch (e) {
    console.error('Error in PrivateChannel component:', e)
    return <p>An unexpected error occurred.</p>
  }
}

export default PrivateChannel
