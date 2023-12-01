import React from 'react'
import { PrivateMessage } from '../../gql/graphql'
import { UserInformations } from '../../store/slices/user-informations.slice'

interface MessageComponentProps {
  message: PrivateMessage
  sender: UserInformations
  userId: string
  onEdit: (messageId: string, newContent: string) => void
  onDelete: (messageId: string) => void
  editionMode: {
    editionInfos: { id: string; content: string } | null
    setEditionsInfos: React.Dispatch<
      React.SetStateAction<{ id: string; content: string } | null>
    >
  }
}

const MessageComponent: React.FC<MessageComponentProps> = ({
  message,
  sender,
  userId,
  onEdit,
  onDelete,
  editionMode
}) => {
  const onHandleEdit = () => {
    const trimmedMessage = editionMode.editionInfos?.content.trim()

    if (
      editionMode.editionInfos &&
      editionMode.editionInfos.id &&
      trimmedMessage &&
      trimmedMessage !== ''
    ) {
      console.log('onEdit')
      onEdit(editionMode.editionInfos.id, trimmedMessage)
    } else {
      editionMode.setEditionsInfos(null)
    }
  }

  return (
    <div>
      {editionMode.editionInfos !== null &&
      editionMode.editionInfos?.id === message.id ? (
        <>
          <input
            type='text'
            value={editionMode.editionInfos.content}
            onChange={(e) =>
              editionMode.setEditionsInfos((prev) =>
                prev !== null ? { ...prev, content: e.target.value } : null
              )
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') onHandleEdit()
            }}
          />
          <button onClick={() => onHandleEdit()}>Save</button>
        </>
      ) : (
        <>
          <strong>{sender.username}</strong> {message.content}
          {!editionMode.editionInfos && message.senderId === userId && (
            <>
              <button
                onClick={() =>
                  editionMode.setEditionsInfos({
                    id: message.id,
                    content: message.content
                  })
                }
              >
                Edit
              </button>
              <button onClick={() => onDelete(message.id)}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default MessageComponent