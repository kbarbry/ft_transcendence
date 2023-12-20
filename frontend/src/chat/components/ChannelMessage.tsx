import React, { useState } from 'react'
import { ChannelMember, ChannelMessage } from '../../gql/graphql'
import { Button, Input, Space, Tooltip } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { useAppSelector } from '../../store/hooks'

interface ChannelMessageProps {
  message: ChannelMessage
  sender: ChannelMember
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

const ChannelMessageComponent: React.FC<ChannelMessageProps> = ({
  message,
  userId,
  onEdit,
  onDelete,
  editionMode
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [, setPastEdit] = useState<string | null>(null)
  const userBlocked = useAppSelector(
    (state) => state.blockedInformations.blockeds
  )
  const handleOnEdit = () => {
    const trimmedMessage = editionMode.editionInfos?.content.trim()

    if (userBlocked.some((user) => user.id === sender.userId)) {
      return <></>
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

export default ChannelMessageComponent
