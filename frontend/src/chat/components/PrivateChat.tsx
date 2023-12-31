import { useMutation, useSubscription } from '@apollo/client'
import React, { useEffect, useRef, useState } from 'react'
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
import { Avatar, Button, Input, List, Skeleton, Space } from 'antd'
import ErrorNotification from '../../notifications/ErrorNotificartion'

import DefaultProfilePicture from '/DefaultProfilePicture.svg'

interface PrivateChatProps {
  userInfos: User
  friends: User[]
  friendId: string
  chatState: {
    chat: PrivateMessage[]
    setChat: React.Dispatch<React.SetStateAction<PrivateMessage[]>>
  }
}

const PrivateChat: React.FC<PrivateChatProps> = ({
  userInfos,
  friends,
  friendId,
  chatState
}) => {
  const [messageInput, setMessageInput] = useState('')
  const [editionInfos, setEditionsInfos] = useState<{
    id: string
    content: string
  } | null>(null)
  const senderId = userInfos.id
  const friend = friends.find((friend) => friend.id === friendId)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  if (!friend) throw new Error()

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatState.chat.length])

  const setChatWithLimit = (message: PrivateMessage) => {
    const updatedChat = [...chatState.chat, message].slice(-50)
    chatState.setChat(updatedChat)
  }

  const { error: errorMessageCreation } = useSubscription<
    PrivateMessageCreationSubscription,
    PrivateMessageCreationSubscriptionVariables
  >(subscriptionOnMessageCreation, {
    variables: { senderId, receiverId: friend.id },
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
    variables: { senderId, receiverId: friend.id },
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
    variables: { senderId, receiverId: friend.id },
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
            receiverId: friend.id,
            content: messageInput
          }
        }
      })
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Channel error', error_message)

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
    } catch (Error) {
      chatState.chat[index].content = oldMessage
      setEditionsInfos(null)
      const error_message = (Error as Error).message
      ErrorNotification('Channel error', error_message)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage({
        variables: {
          deletePrivateMessageId: messageId
        }
      })
    } catch (Error) {
      const error_message = 'Cannot delete this message'
      ErrorNotification('Login Error', error_message)
    }
  }

  const sender = (id: string) => {
    return id === userInfos.id ? userInfos : friend
  }

  const listItems = chatState.chat.map((message, index) => {
    const senderMessage = sender(message.senderId)

    return (
      <List.Item
        key={index}
        style={{
          transition: 'background-color 0.3s ease-in-out',
          backgroundColor: message.senderId === senderId ? '#333' : '#222',
          padding: '10px'
        }}
      >
        <List.Item.Meta
          avatar={
            <Avatar src={senderMessage.avatarUrl || DefaultProfilePicture} />
          }
          title={senderMessage.username}
          description={message.content}
        />
        <PrivateMessageComponent
          message={message}
          sender={senderMessage}
          userId={senderId}
          onEdit={handleEditMessage}
          onDelete={handleDeleteMessage}
          editionMode={{ editionInfos, setEditionsInfos }}
          key={message.id}
        />
      </List.Item>
    )
  })

  return (
    <Space
      direction='vertical'
      style={{
        boxSizing: 'border-box',
        height: '100%',
        border: '5px solid #333'
      }}
    >
      <Space
        ref={chatContainerRef}
        direction='vertical'
        style={{
          width: '49vw',
          height: '60vh',
          overflowY: 'scroll',
          overflowWrap: 'break-word'
        }}
      >
        {!chatState ? (
          <Skeleton active style={{ padding: '6px 6px 0px 6px' }} />
        ) : (
          <List style={{ padding: '6px 6px 0px 6px' }}>{listItems}</List>
        )}
        {(errorMessageCreation ||
          errorMessageEdition ||
          errorMessageDeletion) && <div>Error: subscription failed</div>}
      </Space>
      <Space
        style={{
          width: '100%',
          position: 'sticky',
          bottom: 0,
          backgroundColor: '#333',
          padding: '8px'
        }}
      >
        <Input
          type='text'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder='Type your message...'
          onPressEnter={handleSendMessage}
          style={{ width: '100%' }}
        />
        <Button
          type='primary'
          onClick={handleSendMessage}
          style={{ marginLeft: 8 }}
        >
          Send
        </Button>
      </Space>
    </Space>
  )
}

export default PrivateChat
