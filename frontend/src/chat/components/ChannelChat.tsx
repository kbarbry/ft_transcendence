import React, { useEffect, useRef, useState } from 'react'
import {
  ChannelMessage,
  ChannelMessageCreationSubscription,
  ChannelMessageCreationSubscriptionVariables,
  ChannelMessageDeletionSubscription,
  ChannelMessageDeletionSubscriptionVariables,
  ChannelMessageEditionSubscription,
  ChannelMessageEditionSubscriptionVariables,
  CreateChannelMessageMutation,
  CreateChannelMessageMutationVariables,
  DeleteChannelMessageMutation,
  DeleteChannelMessageMutationVariables,
  UpdateChannelMessageMutation,
  UpdateChannelMessageMutationVariables
} from '../../gql/graphql'
import { useMutation, useSubscription } from '@apollo/client'
import {
  mutationCreateChannelMessage,
  mutationDeleteChannelMessage,
  mutationUpdateChannelMessage,
  subscriptionOnChannelMessageCreation,
  subscriptionOnChannelMessageDeletion,
  subscriptionOnChannelMessageEdition
} from '../graphql'
import ChannelMessageComponent from './ChannelMessage'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'
import PopUpError from '../../ErrorPages/PopUpError'
import { Avatar, Button, Input, List, Skeleton, Space } from 'antd'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'
import { GiMute } from 'react-icons/gi'
import Notification from '../../notifications/MuteNotification'
import ErrorNotification from '../../notifications/ErrorNotificartion'


interface ChannelChatProps {
  channelsInfos: ChannelAndChannelMember[]
  channelId: string
  chatState: {
    chat: ChannelMessage[]
    setChat: React.Dispatch<React.SetStateAction<ChannelMessage[]>>
  }
}

const ChannelChat: React.FC<ChannelChatProps> = ({
  channelsInfos,
  channelId,
  chatState
}) => {
  const [messageInput, setMessageInput] = useState('')
  const [editionInfos, setEditionsInfos] = useState<{
    id: string
    content: string
  } | null>(null)
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )

  const chatContainerRef = useRef<HTMLDivElement>(null)

  if (!channelInfo) throw new Error()

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatState.chat.length])

  const setChatWithLimit = (message: ChannelMessage) => {
    const updatedChat = [...chatState.chat, message].slice(-50)
    chatState.setChat(updatedChat)
  }

  const { error: errorMessageCreation } = useSubscription<
    ChannelMessageCreationSubscription,
    ChannelMessageCreationSubscriptionVariables
  >(subscriptionOnChannelMessageCreation, {
    variables: { channelId },
    onData: (received) => {
      const receivedMessage = received.data.data?.channelMessageCreation

      if (!receivedMessage) return

      setChatWithLimit(receivedMessage)
    }
  })

  const { error: errorMessageEdition } = useSubscription<
    ChannelMessageEditionSubscription,
    ChannelMessageEditionSubscriptionVariables
  >(subscriptionOnChannelMessageEdition, {
    variables: { channelId },
    onData: (received) => {
      const receivedMessage = received.data.data?.channelMessageEdition

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
    ChannelMessageDeletionSubscription,
    ChannelMessageDeletionSubscriptionVariables
  >(subscriptionOnChannelMessageDeletion, {
    variables: { channelId },
    onData: (received) => {
      const receivedMessage = received.data.data?.channelMessageDeletion

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
    CreateChannelMessageMutation,
    CreateChannelMessageMutationVariables
  >(mutationCreateChannelMessage)

  const [editMessage] = useMutation<
    UpdateChannelMessageMutation,
    UpdateChannelMessageMutationVariables
  >(mutationUpdateChannelMessage)

  const [deleteMessage] = useMutation<
    DeleteChannelMessageMutation,
    DeleteChannelMessageMutationVariables
  >(mutationDeleteChannelMessage)

  const handleSendMessage = async () => {
    if (channelInfo.channelMemberUser.muted === true) {
      Notification(
        'Muted',
        "You are muted and can't send messages for now.",
        <GiMute style={{ color: '#108ee9' }} />
      )

      setMessageInput('')
      return
    }
    if (messageInput.trim() === '') {
      setMessageInput('')
      return
    }
    try {
      await sendMessage({
        variables: {
          data: {
            channelId: channelId,
            senderId: channelInfo.channelMemberUser.userId,
            content: messageInput
          }
        }
      })

      setMessageInput('')
    } catch (Error) {
      const error_message = 'Invalid message'
      ErrorNotification('Channel error', error_message)

    }
  }

  const handleEditMessage = async (messageId: string, newContent: string) => {
    if (
      channelInfo.channelMemberUser.muted === true ||
      newContent.trim() === ''
    ) {
      setEditionsInfos(null)
      return
    }

    const index = chatState.chat.findIndex(
      (message) => message.id === messageId
    )
    const oldMessage = chatState.chat[index].content
    try {
      await editMessage({
        variables: {
          updateChannelMessageId: messageId,
          data: { content: newContent }
        }
      })
      setEditionsInfos(null)
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Channel error', error_message)
      chatState.chat[index].content = oldMessage
      setEditionsInfos(null)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage({ variables: { deleteChannelMessageId: messageId } })
    } catch (Error) {
      const error_message = 'Cannot delete this message'
      ErrorNotification('Channel error', error_message)

    }
  }

  const sender = (id: string) => {
    if (id === channelInfo.channelMemberUser.userId) {
      return channelInfo.channelMemberUser
    } else {
      const sender = channelInfo.channelMembers.find(
        (member) => member.userId === id
      )

      return sender
    }
  }

  const listItems = chatState.chat.map((message, index) => {
    const messageSender = sender(message.senderId)
    if (!messageSender) return

    return (
      <List.Item
        key={index}
        style={{
          transition: 'background-color 0.3s ease-in-out',
          backgroundColor:
            message.senderId === channelInfo.channelMemberUser.userId
              ? '#333'
              : '#222',
          padding: '10px'
        }}
      >
        <List.Item.Meta
          avatar={
            <Avatar src={messageSender.avatarUrl || DefaultProfilePicture} />
          }
          title={messageSender.nickname}
          description={message.content}
        />
        <ChannelMessageComponent
          message={message}
          sender={messageSender}
          userId={channelInfo.channelMemberUser.userId}
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
          width: '42vw',
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

export default ChannelChat
