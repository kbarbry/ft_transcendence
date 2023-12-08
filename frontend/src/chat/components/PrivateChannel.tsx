import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import { UserInformations } from '../../store/slices/user-informations.slice'
import {
  FindAllPrivateMessageWithQuery,
  FindAllPrivateMessageWithQueryVariables,
  PrivateMessage
} from '../../gql/graphql'
import { useQuery } from '@apollo/client'
import { queryFindAllPrivateMessageWith } from '../graphql'
import { useAppSelector } from '../../store/hooks'

interface PrivateChannelProps {
  friend: UserInformations
}

const PrivateChannel: React.FC<PrivateChannelProps> = ({ friend }) => {
  const [chat, setChat] = useState<PrivateMessage[]>([])
  const userInfos = useAppSelector((state) => state.userInformations.user)

  useEffect(() => {
    setChat([])
  }, [friend])

  try {
    if (!userInfos) throw new Error()
    const { loading, error } = useQuery<
      FindAllPrivateMessageWithQuery,
      FindAllPrivateMessageWithQueryVariables
    >(queryFindAllPrivateMessageWith, {
      variables: {
        receiverId: friend.id,
        senderId: userInfos?.id // replace with the actual current user ID
      },
      onCompleted: (result) => {
        setChat(result.findAllPrivateMessageWith.reverse() || [])
      }
    })

    return (
      <>
        <div>
          <h2>{friend.username}</h2>
          {loading && <p>Loading conversation...</p>}
          {error && <p>Error loading conversation: {JSON.stringify(error)}</p>}
          <Chat
            userInfos={userInfos}
            receiver={friend}
            chatState={{ chat, setChat }}
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
