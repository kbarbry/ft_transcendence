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
  PrivateMessage,
  PrivateMessageCreationSubscription,
  PrivateMessageCreationSubscriptionVariables,
  PrivateMessageDeletionSubscription,
  PrivateMessageDeletionSubscriptionVariables,
  PrivateMessageEditionSubscription,
  PrivateMessageEditionSubscriptionVariables,
  UpdatePrivateMessageMutation,
  UpdatePrivateMessageMutationVariables,
  User
} from '../../gql/graphql'
import PrivateMessageComponent from './PrivateMessage'

interface PrivateChatProps {
  userInfos: User
  receiver: User
  chatState: {
    chat: PrivateMessage[]
    setChat: React.Dispatch<React.SetStateAction<PrivateMessage[]>>
  }
}

const PrivateChat: React.FC<PrivateChatProps> = ({
  userInfos,
  receiver,
  chatState
}) => {
  const [messageInput, setMessageInput] = useState('')

  const [editionInfos, setEditionsInfos] = useState<{
    id: string
    content: string
  } | null>(null)

  const senderId = userInfos.id
  const receiverId = receiver.id

  const setChatWithLimit = (message: PrivateMessage) => {
    const updatedChat = [...chatState.chat, message].slice(-50)
    chatState.setChat(updatedChat)
  }

  const { error: errorMessageCreation } = useSubscription<
    PrivateMessageCreationSubscription,
    PrivateMessageCreationSubscriptionVariables
  >(subscriptionOnMessageCreation, {
    variables: { senderId, receiverId },
    onData: (received) => {
      const receivedMessage = received.data.data?.privateMessageCreation

      if (!receivedMessage) return

      setChatWithLimit(receivedMessage)
    }
  })

  const { error: errorMessageEdition } = useSubscription<
    PrivateMessageEditionSubscription,
    PrivateMessageEditionSubscriptionVariables
  >(subscriptionOnMessageEdition, {
    variables: { senderId, receiverId },
    onData: (received) => {
      const receivedMessage = received.data.data?.privateMessageEdition

      if (!receivedMessage) return

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

  const { error: errorMessageDeletion } = useSubscription<
    PrivateMessageDeletionSubscription,
    PrivateMessageDeletionSubscriptionVariables
  >(subscriptionOnMessageDeletion, {
    variables: { senderId, receiverId },
    onData: (received) => {
      const receivedMessage = received.data.data?.privateMessageDeletion

      if (!receivedMessage) return

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
    try {
      await sendMessage({
        variables: {
          data: {
            senderId,
            receiverId,
            content: messageInput
          }
        }
      })
    } catch (e) {
      throw e
    }

    setMessageInput('')
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
    } catch (e) {
      chatState.chat[index].content = oldMessage
      setEditionsInfos(null)
      throw e
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage({
        variables: {
          deletePrivateMessageId: messageId
        }
      })
    } catch (e) {
      throw e
    }
  }

  const sender = (id: string) => {
    return id === userInfos.id ? userInfos : receiver
  }

  const listItems = chatState.chat.map((message, index) => {
    return (
      <li key={index}>
        <PrivateMessageComponent
          message={message}
          sender={sender(message.senderId)}
          userId={senderId}
          onEdit={handleEditMessage}
          onDelete={handleDeleteMessage}
          editionMode={{ editionInfos, setEditionsInfos }}
          key={message.id}
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
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder='Type your message...'
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage()
          }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      {(errorMessageCreation ||
        errorMessageEdition ||
        errorMessageDeletion) && <div>Error: subscription failed</div>}
    </>
  )
}

export default PrivateChat
