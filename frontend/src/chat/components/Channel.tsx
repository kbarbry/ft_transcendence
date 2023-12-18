import React, { useState } from 'react'
import {
  ChannelMessage,
  CreateChannelInvitedMutation,
  CreateChannelInvitedMutationVariables,
  DeleteChannelMutation,
  DeleteChannelMutationVariables,
  FindAllChannelMessageInChannelQuery,
  FindAllChannelMessageInChannelQueryVariables,
  FindOneUserByUsernameQuery,
  FindOneUserByUsernameQueryVariables
} from '../../gql/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
  mutationCreateChannelInvited,
  mutationDeleteChannel,
  queryFindAllChannelMessageInChannel
} from '../graphql'
import ChannelChat from './ChannelChat'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'
import ChannelMemberProfile from './ChannelMemberProfile'
import ChannelInvitedProfile from './ChannelInvitedProfile'
import ChannelBlockedProfile from './ChannelBlockedProfile'
import { client } from '../../main'
import { findOneUserByUsername } from '../../relations/graphql'
import PopUpError from '../../ErrorPages/PopUpError'
import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  Divider,
  Input,
  List,
  Row,
  Space,
  Tooltip
} from 'antd'
import { useMediaQuery } from 'react-responsive'
import { DeleteOutlined } from '@ant-design/icons'
import ErrorNotification from '../../notifications/ErrorNotificartion'


interface ChannelProps {
  channelsInfos: ChannelAndChannelMember[]
  channelId: string
}

const ChannelComponent: React.FC<ChannelProps> = ({
  channelsInfos,
  channelId
}) => {
  const [chat, setChat] = useState<ChannelMessage[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const [channelInviteInput, setChannelInviteInput] = useState('')
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )

  if (!channelInfo) throw new Error()

  const [createChannelInvited] = useMutation<
    CreateChannelInvitedMutation,
    CreateChannelInvitedMutationVariables
  >(mutationCreateChannelInvited)

  const [deleteChannel] = useMutation<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >(mutationDeleteChannel)

  try {
    const { loading, error } = useQuery<
      FindAllChannelMessageInChannelQuery,
      FindAllChannelMessageInChannelQueryVariables
    >(queryFindAllChannelMessageInChannel, {
      variables: { channelId },
      fetchPolicy: 'network-only',
      onCompleted: (result) => {
        setChat([...result.findAllChannelMessageInChannel].reverse() || [])
      }
    })

    const handleInviteUser = async () => {
      try {
        const data = await client.query<
          FindOneUserByUsernameQuery,
          FindOneUserByUsernameQueryVariables
        >({
          query: findOneUserByUsername,
          variables: { username: channelInviteInput }
        })

        await createChannelInvited({
          variables: {
            data: {
              channelId: channelInfo.channel.id,
              userId: data.data.findOneUserByUsername.id
            }
          }
        })
        setChannelInviteInput('')
      } catch (Error) {
        const error_message = 'Cannot invit this user in this channel'
        ErrorNotification('Channel Error', error_message)
      }
    }

    const handleDeleteChannel = async () => {
      try {
        await deleteChannel({
          variables: { deleteChannelId: channelId }
        })
      } catch (Error) {
        const error_message = 'Cannot delete channel'
        ErrorNotification('Channel Error', error_message)

      }
    }

    const isSmallScreen = useMediaQuery({ maxWidth: 768 })

    const items: CollapseProps['items'] = [
      {
        key: '1',
        label: 'Members',
        children: (
          <List
            dataSource={channelInfo.channelMembers}
            renderItem={(member) => (
              <List.Item
                style={{
                  overflowX: 'hidden',
                  padding: '2px',
                  margin: '0px',
                  width: '100%'
                }}
              >
                <ChannelMemberProfile
                  channelsInfos={channelsInfos}
                  channelId={channelId}
                  memberId={member.userId}
                  key={member.userId}
                />
              </List.Item>
            )}
          />
        ),
        extra: <>{channelInfo.channelMembers.length}</>
      },
      {
        key: '2',
        label: 'Invited',
        children: (
          <List
            dataSource={channelInfo.channelInviteds}
            renderItem={(member) => (
              <List.Item style={{ overflowX: 'hidden' }}>
                <ChannelInvitedProfile
                  channelsInfos={channelsInfos}
                  channelId={channelId}
                  memberId={member.id}
                  key={member.id}
                />
              </List.Item>
            )}
          />
        ),
        extra: <>{channelInfo.channelInviteds.length}</>
      },
      {
        key: '3',
        label: 'Blocked',
        children: (
          <List
            dataSource={channelInfo.channelBlockeds}
            renderItem={(member) => (
              <List.Item style={{ overflowX: 'hidden' }}>
                <ChannelBlockedProfile
                  channelsInfos={channelsInfos}
                  channelId={channelId}
                  memberId={member.id}
                  key={member.id}
                />
              </List.Item>
            )}
          />
        ),
        extra: <>{channelInfo.channelBlockeds.length}</>
      }
    ]

    return (
      <Row
        gutter={[16, 16]}
        style={{ height: '100%', width: '100%', overflowY: 'auto' }}
      >
        <Col span={isSmallScreen ? 24 : 16} style={{ height: '100%' }}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Space
              direction='horizontal'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <h2>{channelInfo.channel.name}</h2>
              {channelInfo.channelMemberUser.userId ===
                channelInfo.channel.ownerId && (
                <Tooltip title='Delete Channel'>
                  <DeleteOutlined
                    style={{
                      opacity: isHovered ? 1 : 0.5,
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                    onClick={() => handleDeleteChannel()}
                  />
                </Tooltip>
              )}
              {loading && <p>Loading conversation...</p>}
              {error && (
                <p>
                  Error loading conversation, please try later. You can still
                  use the chat
                </p>
              )}
            </Space>
            <ChannelChat
              channelsInfos={channelsInfos}
              channelId={channelId}
              chatState={{ chat, setChat }}
              key={channelInfo.channel.id}
            />
          </Space>
        </Col>
        {!isSmallScreen && (
          <>
            <Col span={1} style={{ height: '100%', width: '100%' }}>
              <Divider
                type='vertical'
                style={{ height: '100%', marginLeft: '50%' }}
              />
            </Col>
            <Col span={7} style={{ width: '100%' }}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <h2
                  style={{
                    marginBottom: '0px',
                    textAlign: 'center'
                  }}
                >
                  Channel Informations
                </h2>
                <Divider
                  style={{ height: '10px', margin: '0px', marginTop: '10px' }}
                />
                <Space direction='vertical'>
                  <Input
                    type='text'
                    placeholder='Enter username'
                    value={channelInviteInput}
                    onChange={(e) => setChannelInviteInput(e.target.value)}
                  />
                  <Button
                    style={{ width: '100%' }}
                    type='primary'
                    onClick={handleInviteUser}
                  >
                    Invite User
                  </Button>
                </Space>
                <Collapse
                  ghost
                  style={{ border: '1px solid #333' }}
                  defaultActiveKey={['1']}
                  items={items}
                />
              </Space>
            </Col>
          </>
        )}
      </Row>
    )
  } catch (e) {
    console.error('Error in Channel component:', e)
    return <p>An unexpected error occurred.</p>
  }
}

export default ChannelComponent
