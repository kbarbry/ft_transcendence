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
  FindOneUserByUsernameQueryVariables,
  UpdateChannelMutation,
  UpdateChannelMutationVariables
} from '../../gql/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
  mutationCreateChannelInvited,
  mutationDeleteChannel,
  mutationUpdateChannel,
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
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Row,
  Space,
  Tooltip
} from 'antd'
import { useMediaQuery } from 'react-responsive'
import { DeleteOutlined } from '@ant-design/icons'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import SuccessNotification from '../../notifications/SuccessNotification'


import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined
} from '@ant-design/icons'


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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )

  if (!channelInfo || !channelInfo.channel) throw new Error()

  const [createChannelInvited] = useMutation<
    CreateChannelInvitedMutation,
    CreateChannelInvitedMutationVariables
  >(mutationCreateChannelInvited)

  const [deleteChannel] = useMutation<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >(mutationDeleteChannel)

  const [updateChannel] = useMutation<
    UpdateChannelMutation,
    UpdateChannelMutationVariables
  >(mutationUpdateChannel)

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
        SuccessNotification('Success', `User has been ${channelInviteInput} invited with success !`)
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
        SuccessNotification('Success', 'Channel has been deleted with success !')
      } catch (Error) {
        const error_message = 'Cannot delete channel'
        ErrorNotification('Channel Error', error_message)

      }
    }

    const isSmallScreen = useMediaQuery({ maxWidth: 768 })

    const onFinish = async () => {
      try {
        let name =
          editedChannel.name.trim() === channelInfo.channel.name
            ? undefined
            : editedChannel.name

        let password =
          editedChannel.password.trim() === channelInfo.channel.password
            ? undefined
            : editedChannel.password
        if (
          password?.trim() === '' &&
          (channelInfo.channel.password === undefined ||
            channelInfo.channel.password === null)
        )
          password = undefined

        let topic =
          editedChannel.topic.trim() === channelInfo.channel.topic
            ? undefined
            : editedChannel.topic
        if (
          topic?.trim() === '' &&
          (channelInfo.channel.topic === undefined ||
            channelInfo.channel.topic === null)
        )
          topic = undefined

        let maxUsers =
          editedChannel.maxUsers === channelInfo.channel.maxUsers
            ? undefined
            : editedChannel.maxUsers

        await updateChannel({
          variables: {
            updateChannelId: channelId,
            data: {
              name,
              password,
              topic,
              maxUsers
            }
          }
        })
        setIsEditModalVisible(false)
      } catch (Error) {
        const error_message = (Error as Error).message
        setIsError(true)
        setErrorMessage(error_message)
      }
    }

    const onFinishFailed = () => {
      console.log('Failed')
    }

    const [editedChannel, setEditedChannel] = useState({
      name: channelInfo.channel.name,
      password: channelInfo.channel.password || '',
      topic: channelInfo.channel.topic || '',
      maxUsers: channelInfo.channel.maxUsers
    })

    const showEditModal = () => {
      console.log(channelInfo.channel.name)
      setEditedChannel({
        name: channelInfo.channel.name,
        password: channelInfo.channel.password || '',
        topic: channelInfo.channel.topic || '',
        maxUsers: channelInfo.channel.maxUsers
      })
      setIsEditModalVisible(true)
    }

    const handleEditModalCancel = () => {
      console.log(channelInfo.channel.name)
      setIsEditModalVisible(false)
    }

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
                <>
                  <Tooltip title='Edit Channel'>
                    <EditOutlined
                      style={{
                        marginLeft: '10px',
                        opacity: isHovered ? 1 : 0.5,
                        transition: 'opacity 0.3s ease-in-out'
                      }}
                      onClick={showEditModal}
                    />
                  </Tooltip>
                  <Tooltip title='Delete Channel'>
                    <DeleteOutlined
                      style={{
                        opacity: isHovered ? 1 : 0.5,
                        transition: 'opacity 0.3s ease-in-out'
                      }}
                      onClick={() => handleDeleteChannel()}
                    />
                  </Tooltip>
                </>
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
        <Modal
          title='Edit Channel'
          open={isEditModalVisible}
          onCancel={handleEditModalCancel}
          footer={[
            <Button key='cancel' onClick={handleEditModalCancel}>
              Cancel
            </Button>,
            <Button key='submit' type='primary' onClick={onFinish}>
              Submit
            </Button>
          ]}
        >
          <Form
            layout='vertical'
            initialValues={editedChannel}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label='Channel Name'
              name='name'
              rules={[
                {
                  type: 'string',
                  message: 'Channel Name must be a string.'
                },
                {
                  max: 30,
                  message: 'Channel Name must be at most 30 characters long.'
                },
                {
                  pattern: /^[a-zA-Z0-9_\-\.]+( [a-zA-Z0-9_\-\.]+)?$/,
                  message:
                    'Channel Name can only contain letters, numbers, single spaces, and "_-.".'
                }
              ]}
            >
              <Input
                type='text'
                value={editedChannel.name}
                onChange={(e) =>
                  setEditedChannel({ ...editedChannel, name: e.target.value })
                }
                placeholder='Enter Channel Name'
                maxLength={30}
                showCount
              />
            </Form.Item>
            <Form.Item
              label='Channel Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please enter the Channel Password!'
                },
                {
                  type: 'string',
                  message: 'Channel Password must be a string.'
                },
                {
                  max: 30,
                  message:
                    'Channel Password must be at most 30 characters long.'
                },
                {
                  pattern: /^[a-zA-Z0-9!@#$%^&+=]*$/,
                  message:
                    'Channel Password must be between 1 and 30 characters long, and can only contain these special characters: "!@#$%^&+="'
                }
              ]}
            >
              <Input.Password
                type='password'
                value={editedChannel.password}
                onChange={(e) =>
                  setEditedChannel({
                    ...editedChannel,
                    password: e.target.value
                  })
                }
                placeholder='Enter Channel Password'
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item label='Maximum Users' name='maxUsers'>
              <InputNumber
                min={1}
                max={50}
                value={editedChannel.maxUsers}
                onChange={(value) =>
                  setEditedChannel({ ...editedChannel, maxUsers: value || 50 })
                }
                placeholder='Enter Maximum Users'
                style={{ width: '100%' }}
                addonAfter={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              label='Channel Topic'
              name='topic'
              rules={[
                {
                  type: 'string',
                  message: 'Channel Name must be a string.'
                },
                {
                  max: 1024,
                  message:
                    'Channel Password must be at most 1024 characters long.'
                }
              ]}
            >
              <Input.TextArea
                rows={4}
                value={editedChannel.topic}
                onChange={(e) =>
                  setEditedChannel({ ...editedChannel, topic: e.target.value })
                }
                placeholder='Enter Channel Topic'
                maxLength={1024}
                showCount
              />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    )
  } catch (e) {
    console.error('Error in Channel component:', e)
    return <p>An unexpected error occurred.</p>
  }
}

export default ChannelComponent
