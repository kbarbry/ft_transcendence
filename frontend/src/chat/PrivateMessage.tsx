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
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import {
  CreatePrivateMessageMutation,
  CreatePrivateMessageMutationVariables,
  DeletePrivateMessageMutation,
  DeletePrivateMessageMutationVariables,
  UpdatePrivateMessageMutation,
  UpdatePrivateMessageMutationVariables
} from '../gql/graphql'

const PrivateMessage: React.FC = () => {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<any[]>([])
  const [editingMessage, setEditingMessage] = useState<{
    id: string
    content: string
  } | null>(null)
  const userInfos = useSelector((state: RootState) => state.userInformations)

  const senderId = userInfos.user?.id
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
    if (!senderId) return
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
    if (editingMessage !== null) {
      await editMessage({
        variables: {
          updatePrivateMessageId: messageId,
          data: { content: newContent }
        }
      })
    }
    setEditingMessage(null)
  }

  const handleDeleteMessage = async (messageId: string) => {
    await deleteMessage({
      variables: {
        deletePrivateMessageId: messageId
      }
    })
  }

  const listItems = chat.map((comment, index) => (
    <li key={index}>
      <div>
        {editingMessage !== null && editingMessage?.id === comment.id ? (
          <>
            <input
              type='text'
              value={editingMessage.content}
              onChange={(e) =>
                setEditingMessage((prev) =>
                  prev !== null ? { ...prev, content: e.target.value } : null
                )
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter')
                  handleEditMessage(editingMessage.id, editingMessage.content)
              }}
            />
            <button
              onClick={() =>
                handleEditMessage(editingMessage.id, editingMessage.content)
              }
            >
              Save
            </button>
          </>
        ) : (
          <>
            <strong>Boubou:</strong> {comment.content}
            {!editingMessage && comment.senderId === senderId && (
              <>
                <button
                  onClick={() =>
                    setEditingMessage({
                      id: comment.id,
                      content: comment.content
                    })
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteMessage(comment.id)}>
                  Delete
                </button>
              </>
            )}
          </>
        )}
      </div>
    </li>
  ))

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
