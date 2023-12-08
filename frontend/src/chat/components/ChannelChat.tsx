import React, { useState } from 'react'
import {
  Channel,
  ChannelMember,
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

interface ChannelChatProps {
  channel: Channel
  channelMemberUser: ChannelMember
  channelMembers: ChannelMember[]
  chatState: {
    chat: ChannelMessage[]
    setChat: React.Dispatch<React.SetStateAction<ChannelMessage[]>>
  }
}

const ChannelChat: React.FC<ChannelChatProps> = ({
  channel,
  channelMemberUser,
  channelMembers,
  chatState
}) => {
  const [messageInput, setMessageInput] = useState('')

  const [editionInfos, setEditionsInfos] = useState<{
    id: string
    content: string
  } | null>(null)

  const setChatWithLimit = (message: ChannelMessage) => {
    const updatedChat = [...chatState.chat, message].slice(-50)
    chatState.setChat(updatedChat)
  }

  const { error: errorMessageCreation } = useSubscription<
    ChannelMessageCreationSubscription,
    ChannelMessageCreationSubscriptionVariables
  >(subscriptionOnChannelMessageCreation, {
    variables: { channelId: channel.id },
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
    variables: { channelId: channel.id },
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
      }
    }
  })

  const { error: errorMessageDeletion } = useSubscription<
    ChannelMessageDeletionSubscription,
    ChannelMessageDeletionSubscriptionVariables
  >(subscriptionOnChannelMessageDeletion, {
    variables: { channelId: channel.id },
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
    try {
      await sendMessage({
        variables: {
          data: {
            channelId: channel.id,
            senderId: channelMemberUser.userId,
            content: messageInput
          }
        }
      })

      setMessageInput('')
    } catch (e) {
      throw e
    }
  }

  const handleEditMessage = async (messageId: string, newContent: string) => {
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
    } catch (e) {
      chatState.chat[index].content = oldMessage
      setEditionsInfos(null)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage({ variables: { deleteChannelMessageId: messageId } })
    } catch (e) {
      throw e
    }
  }

  const listItems = chatState.chat.map((message, index) => {
    const sender = channelMembers.find(
      (member) => member.userId === message.senderId
    )
    if (!sender) return

    return (
      <li key={index}>
        <ChannelMessageComponent
          message={message}
          sender={sender}
          userId={channelMemberUser.userId}
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

export default ChannelChat
