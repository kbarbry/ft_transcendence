import { useMutation, useSubscription } from '@apollo/client'
import React, { useState } from 'react'
import {
  mutationCreatePrivateMessage,
  mutationDeletePrivateMessage,
  mutationUpdatePrivateMessage,
  subscriptionOnMessageCreation,
  subscriptionOnMessageDeletion,
  subscriptionOnMessageEdition
} from './graphql'
import {
  CreatePrivateMessageMutation,
  CreatePrivateMessageMutationVariables,
  DeletePrivateMessageMutation,
  DeletePrivateMessageMutationVariables,
  UpdatePrivateMessageMutation,
  UpdatePrivateMessageMutationVariables
} from '../gql/graphql'
import { useAppSelector } from '../store/hooks'
import { MessageComponent } from './components/MessageComponent'

export interface IMessage {
  content: string
  createdAt: Date
  id: string
  receiverId: string
  senderId: string
  updatedAt: Date
}

const PrivateMessage: React.FC = () => {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<IMessage[]>([])
  const [editionInfos, setEditionsInfos] = useState<{
    id: string
    content: string
  } | null>(null)

  const userInfos = useAppSelector((state) => state.userInformations.user)
  const senderId = userInfos?.id
  const receiverId = 'FVF8OkvJkHvnS2RNkCABh'

  const { loading, error } = useSubscription(subscriptionOnMessageCreation, {
    variables: { senderId, receiverId },
    onSubscriptionData: (data) => {
      const receivedMessage = data.subscriptionData.data.privateMessageCreation

      setChat((messages) => [...messages, receivedMessage])
    }
  })

  useSubscription(subscriptionOnMessageEdition, {
    variables: { senderId, receiverId },
    onSubscriptionData: (data) => {
      const receivedMessage = data.subscriptionData.data.privateMessageEdition

      const index = chat.findIndex(
        (message) => message.id === receivedMessage.id
      )

      if (index !== -1) {
        const updatedChat = [...chat]
        updatedChat[index] = {
          ...chat[index],
          content: receivedMessage.content
        }
        setChat(updatedChat)
      }
    }
  })

  useSubscription(subscriptionOnMessageDeletion, {
    variables: { senderId, receiverId },
    onSubscriptionData: (data) => {
      const receivedMessage = data.subscriptionData.data.privateMessageDeletion

      const index = chat.findIndex(
        (message) => message.id === receivedMessage.id
      )

      if (index !== -1) {
        const updatedChat = [...chat.slice(0, index), ...chat.slice(index + 1)]
        setChat(updatedChat)
      }
    }
  })

  const [sendMessage] = useMutation<
    CreatePrivateMessageMutation,
    CreatePrivateMessageMutationVariables
  >(mutationCreatePrivateMessage)
  const [editMessage] = useMutation<
    UpdatePrivateMessageMutation,
    UpdatePrivateMessageMutationVariables
  >(mutationUpdatePrivateMessage)
  const [deleteMessage] = useMutation<
    DeletePrivateMessageMutation,
    DeletePrivateMessageMutationVariables
  >(mutationDeletePrivateMessage)

  const handleSendMessage = async () => {
    if (!senderId) throw new Error()
    await sendMessage({
      variables: {
        data: {
          senderId,
          receiverId,
          content: message
        }
      }
    })

    setMessage('')
  }

  const handleEditMessage = async (messageId: string, newContent: string) => {
    const index = chat.findIndex((message) => message.id === messageId)
    const oldMessage = chat[index].content

    try {
      await editMessage({
        variables: {
          updatePrivateMessageId: messageId,
          data: { content: newContent }
        }
      })
      setEditionsInfos(null)
    } catch {
      chat[index].content = oldMessage
      setEditionsInfos(null)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    await deleteMessage({
      variables: {
        deletePrivateMessageId: messageId
      }
    })
  }

  const listItems = chat.map((message, index) => {
    if (!senderId) throw new Error()
    return (
      <li key={index}>
        <MessageComponent
          message={message}
          userId={senderId}
          onEdit={handleEditMessage}
          onDelete={handleDeleteMessage}
          editionMode={{ editionInfos, setEditionsInfos }}
        />
      </li>
    )
  })

  return (
    <>
      <ul>{listItems}</ul>
      <div>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type your message...'
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {JSON.stringify(error)}</div>}
    </>
  )
}

export default PrivateMessage
