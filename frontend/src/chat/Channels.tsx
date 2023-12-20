import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  ChannelAndChannelMember,
  addChannelInfo
} from '../store/slices/channel-informations.slice'
import ChannelComponent from './components/Channel'
import { useMutation } from '@apollo/client'
import {
  mutationCreateChannel,
  mutationCreateChannelMember,
  mutationDeleteChannelInvited,
  queryFindOneChannelByName,
  queryIsChannelPasswordSet
} from './graphql'
import SuccessNotification from '../notifications/SuccessNotification'
import {
  Channel,
  CreateChannelMemberMutation,
  CreateChannelMemberMutationVariables,
  CreateChannelMutation,
  CreateChannelMutationVariables,
  DeleteChannelInvitedMutation,
  DeleteChannelInvitedMutationVariables,
  FindOneChannelByNameQuery,
  FindOneChannelByNameQueryVariables,
  IsChannelPasswordSetQuery,
  IsChannelPasswordSetQueryVariables
} from '../gql/graphql'
import { client } from '../main'
import ErrorNotification from '../notifications/ErrorNotificartion'
import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  Divider,
  Empty,
  Form,
  Input,
  List,
  Modal,
  Row,
  Space
} from 'antd'

const Channels: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userInformations.user)
  const channelInvited = useAppSelector(
    (state) => state.channelInvitedInformations.channelInvitation
  )
  const channelsInfos = useAppSelector(
    (state) => state.channelInformations.channelsInfos
  )

  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const [currentChannelPassword, setCurrentChannelPassword] =
    useState<Channel | null>(null)
  const [password, setPassword] = useState('')

  if (!user || !channelsInfos || !channelInvited) throw new Error()

  const [selectedChannel, setSelectedChannel] =
    useState<ChannelAndChannelMember | null>(null)
  const [channelNameInput, setChannelNameInput] = useState<string>('')
  const numberChannels = channelsInfos.length

  if (
    selectedChannel &&
    !channelsInfos.find(
      (channelInfos) => channelInfos.channel.id === selectedChannel.channel.id
    )
  ) {
    setSelectedChannel(null)
  }

  const [createChannel] = useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(mutationCreateChannel)

  const [createChannelMember] = useMutation<
    CreateChannelMemberMutation,
    CreateChannelMemberMutationVariables
  >(mutationCreateChannelMember)

  const [deleteChannelInvitation] = useMutation<
    DeleteChannelInvitedMutation,
    DeleteChannelInvitedMutationVariables
  >(mutationDeleteChannelInvited)

  const handleChannelNameInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChannelNameInput(event.target.value)
  }

  const handleCreateChannelClick = async () => {
    let isChannelAlsreadySet = true
    try {
      await client.query<
        FindOneChannelByNameQuery,
        FindOneChannelByNameQueryVariables
      >({
        query: queryFindOneChannelByName,
        variables: { name: channelNameInput }
      })
    } catch (error) {
      isChannelAlsreadySet = false
    }
    try {
      if (channelNameInput.trim() === '') {
        setChannelNameInput('')
        throw new Error('Empty channel name')
      }

      if (isChannelAlsreadySet === true)
        throw new Error(`"${channelNameInput}" : Channel name already use`)
      if (numberChannels >= 25) {
        setChannelNameInput('')
        throw new Error('Limit of 25 channels reached')
      }

      const resChannel = await createChannel({
        variables: { data: { name: channelNameInput, ownerId: user.id } }
      })

      const resChannelCreated = resChannel.data?.createChannel

      if (!resChannelCreated) throw new Error('Error on channel creation')
      SuccessNotification(
        'Success',
        `${channelNameInput} created with success !`
      )

      dispatch(
        addChannelInfo({ channelId: resChannelCreated.id, userId: user.id })
      )
      setChannelNameInput('')
    } catch (Error) {
      let error_message = (Error as Error).message
      ErrorNotification('Channel Error', error_message)
    }
  }

  const handleJoinChannelClick = async () => {
    let doestchannelexist = true
    if (channelNameInput.trim() === '') {
      setChannelNameInput('')
      return
    }
    if (numberChannels >= 25) {
      setChannelNameInput('')
      throw new Error('Limit of 25 channels reached')
    }

    try {
      await client.query<
        FindOneChannelByNameQuery,
        FindOneChannelByNameQueryVariables
      >({
        query: queryFindOneChannelByName,
        variables: { name: channelNameInput }
      })
    } catch (error) {
      doestchannelexist = false
    }

    const channelsList = channelsInfos.map((item) => item.channel.name)
    try {
      if (doestchannelexist === false) {
        throw new Error(`${channelNameInput} : Channel does not exist`)
      }
      const { data: dataFindChannel } = await client.query<
        FindOneChannelByNameQuery,
        FindOneChannelByNameQueryVariables
      >({
        query: queryFindOneChannelByName,
        variables: { name: channelNameInput }
      })
      const isChannelNameAlreadyJoined = channelsList.some(
        (channelName) => channelName === channelNameInput
      )
      if (isChannelNameAlreadyJoined == true) {
        throw new Error(
          `${channelNameInput} : You are already a member of this channel`
        )
      }

      const channel = dataFindChannel.findOneChannelByName

      const { data: dataIsPassword } = await client.query<
        IsChannelPasswordSetQuery,
        IsChannelPasswordSetQueryVariables
      >({
        query: queryIsChannelPasswordSet,
        variables: { channelId: channel.id }
      })
      const isPasswordSet = dataIsPassword.isChannelPasswordSet

      if (isPasswordSet) {
        setPasswordModalVisible(true)
        setCurrentChannelPassword(channel)
        return
      }

      await createChannelMember({
        variables: {
          data: {
            channelId: channel.id,
            userId: user.id,
            avatarUrl: user.avatarUrl,
            nickname: user.username
          }
        }
      })
      SuccessNotification(
        'Success',
        `${channelNameInput} joined with success !`
      )

      setChannelNameInput('')
    } catch (Error) {
      let error_message = (Error as Error).message
      if (
        error_message !==
          `${channelNameInput} : You are already a member of this channel` &&
        error_message !== `${channelNameInput} : Channel does not exist`
      ) {
        error_message = 'Cannot join channel'
      }
      ErrorNotification('Login Error', error_message)
    }
  }

  const handleAcceptInvitation = async (channelName: string) => {
    if (numberChannels >= 25) {
      setChannelNameInput('')
      throw new Error('Too many channels')
    }

    try {
      console.log('try join channel with, ', channelName)
      const { data: dataFindChannel } = await client.query<
        FindOneChannelByNameQuery,
        FindOneChannelByNameQueryVariables
      >({
        query: queryFindOneChannelByName,
        variables: { name: channelName }
      })
      const channel = dataFindChannel.findOneChannelByName

      const { data: dataIsPassword } = await client.query<
        IsChannelPasswordSetQuery,
        IsChannelPasswordSetQueryVariables
      >({
        query: queryIsChannelPasswordSet,
        variables: { channelId: channel.id }
      })
      const isPasswordSet = dataIsPassword.isChannelPasswordSet

      if (isPasswordSet) {
        setPasswordModalVisible(true)
        setCurrentChannelPassword(channel)
        return
      }

      console.log(channel)
      await createChannelMember({
        variables: {
          data: {
            channelId: channel.id,
            userId: user.id,
            avatarUrl: user.avatarUrl,
            nickname: user.username
          }
        }
      })
    } catch (Error) {
      const error_message = 'Failed to accept invitation'
      ErrorNotification('Channel Error', error_message)
    }
  }

  const handleRefuseInvitationClick = async (
    channelId: string,
    userId: string
  ) => {
    try {
      await deleteChannelInvitation({
        variables: { channelId, userId }
      })
    } catch (Error) {
      const error_message = 'Failed to refuse invitation'
      ErrorNotification('Channel Error', error_message)
    }
  }

  const handlePasswordSubmit = async () => {
    try {
      setCurrentChannelPassword(null)
      setChannelNameInput('')
      setPassword('')
      setPasswordModalVisible(false)
      if (!currentChannelPassword) throw new Error()

      await createChannelMember({
        variables: {
          data: {
            channelId: currentChannelPassword.id,
            userId: user.id,
            avatarUrl: user.avatarUrl,
            nickname: user.username,
            channelPassword: password
          }
        }
      })
    } catch (error) {
      const error_message = 'Wrong password'
      ErrorNotification('Channel Error', error_message)
      setCurrentChannelPassword(null)
      setChannelNameInput('')
      setPassword('')
    }
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Channel Invitations',
      children: (
        <List
          dataSource={channelInvited}
          renderItem={(channelInvitation) => (
            <List.Item>
              <Space
                direction='vertical'
                style={{ width: '100%' }}
                className='unselectable'
              >
                <span
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {channelInvitation.name}
                </span>
                <Space
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly'
                  }}
                >
                  <Button
                    style={{ width: '10vw' }}
                    type='primary'
                    onClick={() =>
                      handleAcceptInvitation(channelInvitation.name)
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    style={{ width: '10vw' }}
                    type='default'
                    onClick={() =>
                      handleRefuseInvitationClick(channelInvitation.id, user.id)
                    }
                  >
                    Refuse
                  </Button>
                </Space>
              </Space>
            </List.Item>
          )}
        />
      ),
      extra: <>{channelInvited.length}</>
    },
    {
      key: '2',
      label: 'Channels',
      children: (
        <List
          dataSource={channelsInfos}
          renderItem={(channelInfos) => (
            <List.Item>
              <Button
                type='text'
                block
                style={{
                  height: '50px',
                  border: '1px solid #333',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  backgroundColor:
                    selectedChannel &&
                    selectedChannel.channel.id === channelInfos.channel.id
                      ? '#333'
                      : 'transparent',
                  transition: 'background-color 0.3s'
                }}
                onClick={() => setSelectedChannel(channelInfos)}
              >
                {channelInfos.channel.name}
              </Button>
            </List.Item>
          )}
        />
      )
    }
  ]

  return (
    <>
      <Row gutter={[16, 16]} style={{ height: '100%' }}>
        <Col span={6} style={{ height: '100%', overflowY: 'auto' }}>
          <Space
            direction='vertical'
            style={{ width: '100%' }}
            className='unselectable'
          >
            <h2
              style={{
                marginBottom: '0px',
                textAlign: 'center'
              }}
            >
              Channels
            </h2>
            <Divider
              style={{ height: '10px', margin: '0px', marginTop: '10px' }}
            />
            <Input
              type='text'
              value={channelNameInput}
              onChange={handleChannelNameInput}
              placeholder='Enter channel name'
              style={{ width: '100%' }}
            />
            <Space
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly'
              }}
            >
              <Button
                style={{ width: '10vw' }}
                type='primary'
                onClick={handleCreateChannelClick}
              >
                Create
              </Button>
              <Button
                style={{ width: '10vw' }}
                type='primary'
                onClick={handleJoinChannelClick}
              >
                Join
              </Button>
            </Space>
            <Divider
              style={{ height: '10px', margin: '0px', marginTop: '10px' }}
            />
            <Collapse
              ghost
              style={{ border: '1px solid #333' }}
              defaultActiveKey={['2']}
              items={items}
            />
          </Space>
        </Col>
        <Col span={1} style={{ height: '100%' }}>
          <Divider
            type='vertical'
            style={{ height: '100%', marginLeft: '50%' }}
          />
        </Col>
        <Col
          span={17}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {selectedChannel ? (
            <ChannelComponent
              channelsInfos={channelsInfos}
              channelId={selectedChannel.channel.id}
              key={selectedChannel.channel.id}
            />
          ) : (
            <Empty
              image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
              imageStyle={{ height: 100 }}
              description={<span>Select a channel</span>}
            />
          )}
        </Col>
      </Row>
      <Modal
        title='Enter Channel Password'
        open={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={[
          <Button key='cancel' onClick={() => setPasswordModalVisible(false)}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={handlePasswordSubmit}>
            Submit
          </Button>
        ]}
      >
        <Form>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              { required: true, message: 'Please enter the channel password!' }
            ]}
          >
            <Input.Password
              value={password}
              defaultValue={''}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Channels
