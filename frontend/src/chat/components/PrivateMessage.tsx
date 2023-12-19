import React, { useState } from 'react'
import { Space, Input, Button, Tooltip } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { PrivateMessage, User } from '../../gql/graphql'

interface PrivateMessageProps {
  message: PrivateMessage
  sender: User
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

const PrivateMessageComponent: React.FC<PrivateMessageProps> = ({
  message,
  userId,
  onEdit,
  onDelete,
  editionMode
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [pastEdit, setPastEdit] = useState<string | null>(null)

  const handleOnEdit = () => {
    const trimmedMessage = editionMode.editionInfos?.content.trim()

    console.log(pastEdit, ' ', trimmedMessage)
    if (pastEdit?.trim() === trimmedMessage) {
      editionMode.setEditionsInfos(null)
      setPastEdit(null)
      return
    }
    if (
      editionMode.editionInfos &&
      editionMode.editionInfos.id &&
      trimmedMessage &&
      trimmedMessage !== ''
    ) {
      onEdit(editionMode.editionInfos.id, trimmedMessage)
    } else {
      editionMode.setEditionsInfos(null)
      setPastEdit(null)
    }
  }

  const handleCancelEdit = () => {
    setPastEdit(null)
    editionMode.setEditionsInfos(null)
  }

  return (
    <Space
      direction='vertical'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {editionMode.editionInfos !== null &&
      editionMode.editionInfos?.id === message.id ? (
        <Space>
          <Input
            type='text'
            value={editionMode.editionInfos.content}
            onChange={(e) =>
              editionMode.setEditionsInfos((prev) =>
                prev !== null ? { ...prev, content: e.target.value } : null
              )
            }
            style={{ overflowWrap: 'break-word' }}
            onPressEnter={handleOnEdit}
          />
          <Tooltip title='Validate'>
            <Button
              type='default'
              onClick={handleOnEdit}
              icon={<CheckCircleOutlined />}
            />
          </Tooltip>
          <Tooltip title='Cancel'>
            <Button
              type='default'
              onClick={handleCancelEdit}
              icon={<CloseCircleOutlined />}
            />
          </Tooltip>
        </Space>
      ) : (
        <Space>
          {message.senderId === userId && (
            <Space>
              <Tooltip title='Edit'>
                <EditOutlined
                  style={{
                    opacity: isHovered ? 1 : 0.5,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                  onClick={() => {
                    setPastEdit(message.content)
                    editionMode.setEditionsInfos({
                      id: message.id,
                      content: message.content
                    })
                  }}
                />
              </Tooltip>
              <Tooltip title='Delete'>
                <DeleteOutlined
                  style={{
                    opacity: isHovered ? 1 : 0.5,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                  onClick={() => onDelete(message.id)}
                />
              </Tooltip>
            </Space>
          )}
        </Space>
      )}
    </Space>
  )
}

export default PrivateMessageComponent
