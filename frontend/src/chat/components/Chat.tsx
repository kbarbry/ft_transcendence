import { useMutation, useSubscription } from '@apollo/client'
import React, { useState } from 'react'
import {
  mutationCreatePrivateMessage,
  mutationDeletePrivateMessage,
  mutationUpdatePrivateMessage,
  subscriptionOnMessageCreation,
  subscriptionOnMessageDeletion,
  subscriptionOnMessageEdition
} from '../graphql'
import {
  CreatePrivateMessageMutation,
  CreatePrivateMessageMutationVariables,
  DeletePrivateMessageMutation,
  DeletePrivateMessageMutationVariables,
  EStatus,
  PrivateMessage,
  UpdatePrivateMessageMutation,
  UpdatePrivateMessageMutationVariables
} from '../../gql/graphql'
import MessageComponent from './Message'
import { UserInformations } from '../../store/slices/user-informations.slice'

export interface IMessageUser {
  id: string
  username: string
  avatarUrl: string
  status: EStatus
}

interface ChatComponentProps {
  userInfos: UserInformations
  receiver: UserInformations
  chatState: {
    chat: PrivateMessage[]
    setChat: React.Dispatch<React.SetStateAction<PrivateMessage[]>>
  }
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  userInfos,
  receiver,
  chatState
}) => {
  const [message, setMessage] = useState('')

  const [editionInfos, setEditionsInfos] = useState<{
    id: string
    content: string
  } | null>(null)

  const senderId = userInfos?.id
  const receiverId = receiver.id

  const { error } = useSubscription(subscriptionOnMessageCreation, {
    variables: { senderId, receiverId },
    onData: (received) => {
      const receivedMessage = received.data.data.privateMessageCreation

      chatState.setChat((messages) => [...messages, receivedMessage])
    }
  })

  useSubscription(subscriptionOnMessageEdition, {
    variables: { senderId, receiverId },
    onData: (received) => {
      const receivedMessage = received.data.data.privateMessageEdition

      const index = chatState.chat.findIndex(
        (message) => message.id === receivedMessage.id
      )

      if (index !== -1) {
        const updatedChat = [...chatState.chat]
        updatedChat[index] = {
          ...chatState.chat[index],
          content: receivedMessage.content
        }
        chatState.setChat(updatedChat)
      }
    }
  })

  useSubscription(subscriptionOnMessageDeletion, {
    variables: { senderId, receiverId },
    onData: (received) => {
      const receivedMessage = received.data.data.privateMessageDeletion

      const index = chatState.chat.findIndex(
        (message) => message.id === receivedMessage.id
      )

      if (index !== -1) {
        const updatedChat = [
          ...chatState.chat.slice(0, index),
          ...chatState.chat.slice(index + 1)
        ]
        chatState.setChat(updatedChat)
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
    const index = chatState.chat.findIndex(
      (message) => message.id === messageId
    )
    const oldMessage = chatState.chat[index].content

    try {
      await editMessage({
        variables: {
          updatePrivateMessageId: messageId,
          data: { content: newContent }
        }
      })
      setEditionsInfos(null)
    } catch {
      chatState.chat[index].content = oldMessage
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

  const sender = (id: string) => {
    return id === userInfos.id ? userInfos : receiver
  }

  const listItems = chatState.chat.map((message, index) => {
    if (!senderId) throw new Error()
    return (
      <li key={index}>
        <MessageComponent
          message={message}
          sender={sender(message.senderId)}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage()
          }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      {error && <div>Error: {JSON.stringify(error)}</div>}
    </>
  )
}

export default ChatComponent
