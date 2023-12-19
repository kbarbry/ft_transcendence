import React, { useState } from 'react'
import RequestsReceived from './RequestsReceived'
import RequestsSent from './RequestsSent'
import Blockeds from './Blockeds'
import Friends from './Friends'
import { useLazyQuery, useMutation } from '@apollo/client'
import { createRelationRequest, findOneUserByUsername } from './graphql'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setRequestSentInformations } from '../store/slices/request-sent-informations.slice'
import { setRequestReceivedInformations } from '../store/slices/request-received-informations.slice'
import { setFriendInformations } from '../store/slices/friend-informations.slice'
import ErrorNotification from '../notifications/ErrorNotificartion'
import SuccessNotification from '../notifications/SuccessNotification'
import { Button, Col, Divider, Input, Menu, MenuProps, Row, Space } from 'antd'
import {
  UsergroupAddOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
  UserDeleteOutlined
} from '@ant-design/icons'

const Relations: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userInformations.user)
  const friends = useAppSelector((state) => state.friendInformations.friends)
  const blockeds = useAppSelector((state) => state.blockedInformations.blockeds)
  const requestsSent = useAppSelector(
    (state) => state.requestSentInformations.requestSent
  )
  const requestsReceived = useAppSelector(
    (state) => state.requestReceivedInformations.requestReceived
  )
  const friendInformations = useAppSelector(
    (state) => state.friendInformations.friends
  )
  if (!user || !friends || !blockeds || !requestsSent || !requestsReceived)
    throw new Error()

  const [selectedItem, setSelectedItem] = useState<string>('Friends')
  const [usernameInput, setUsernameInput] = useState<string>('')

  const [createRequest] = useMutation(createRelationRequest)
  const [findUserByUsername] = useLazyQuery(findOneUserByUsername)

  const handleUsernameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameInput(event.target.value)
  }
  const handleAddFriendClick = async () => {
    try {
      if (usernameInput.trim() === '') {
        throw new Error('Empty username') as Error
      }
      if (usernameInput.trim().length > 29) {
        throw new Error('Too long username') as Error
      }
      const userByUsername = await findUserByUsername({
        variables: { username: usernameInput }
      })
      if (userByUsername.error) {
        throw new Error(
          `${usernameInput} : Cannot find this user (Or maybe it's your own username ???)`
        ) as Error
      }

      const foundUserData = userByUsername?.data.findOneUserByUsername
      const userReceiverId = foundUserData?.id

      const isUserInputInRequests = requestsSent.some(
        (user) => user.username === usernameInput
      )
      if (isUserInputInRequests) {
        throw new Error(
          `${usernameInput} : You already sent a friend request to this user, wait a little bit !`
        )
      }

      const isFriend = friendInformations?.some(
        (user) => user.username === usernameInput
      )
      if (isFriend) {
        throw new Error(
          `"${usernameInput} : "You are already friend with this user, try to get some new ones !`
        )
      }

      if (foundUserData == null) {
        throw new Error(`${usernameInput} : Failed to add friend`) as Error
      }
      if (foundUserData) {
        await createRequest({
          variables: {
            data: { userSenderId: user.id, userReceiverId: userReceiverId }
          }
        })

        await dispatch(setFriendInformations(user.id))
        await dispatch(setRequestSentInformations(user.id))
        await dispatch(setRequestReceivedInformations(user.id))
        setUsernameInput('')
        SuccessNotification(
          'Success',
          `Friend request to ${usernameInput} has been sent with success`
        )
      }
    } catch (Error) {
      let error_message = (Error as Error).message
      if (
        error_message ===
        'Your data contains some conflict with our application'
      ) {
        error_message = 'Cannot add this friend'
      }
      ErrorNotification('Error', error_message)
    }
  }

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
  }

  const items: MenuProps['items'] = [
    {
      label: 'Friends',
      icon: <UsergroupAddOutlined />,
      key: 'Friends'
    },
    {
      label: 'Requests Received',
      icon: <UserSwitchOutlined />,
      key: 'RequestsReceived'
    },
    {
      label: 'Requests Sent',
      icon: <UserAddOutlined />,
      key: 'RequestsSent'
    },
    {
      label: 'Blocked',
      icon: <UserDeleteOutlined />,
      key: 'Blockeds'
    }
  ]

  return (
    <Row
      gutter={[16, 16]}
      style={{ height: '100%', width: '100%' }}
      className='unselectable'
    >
      <Col span={6} style={{ height: '100%', width: '100%' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <h2
            style={{
              marginBottom: '0px',
              textAlign: 'center'
            }}
          >
            Relations
          </h2>
          <Divider
            style={{ height: '10px', margin: '0px', marginTop: '10px' }}
          />
          <Space direction='vertical'>
            <Input
              type='text'
              placeholder='Enter username'
              value={usernameInput}
              onChange={handleUsernameInputChange}
              onPressEnter={handleAddFriendClick}
            />
            <Button
              style={{ width: '100%' }}
              type='primary'
              onClick={handleAddFriendClick}
            >
              Add Friend
            </Button>
          </Space>
          <Divider
            style={{ height: '10px', margin: '0px', marginTop: '10px' }}
          />
          <Menu
            mode='vertical'
            style={{ backgroundColor: '#242424', borderRight: 'none' }}
            defaultSelectedKeys={['Friends']}
            items={items}
            onClick={(item) => handleItemClick(item.key as string)}
          ></Menu>
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
        {selectedItem === 'Friends' && (
          <Friends key='friends' friends={friends} userId={user.id} />
        )}
        {selectedItem === 'RequestsReceived' && (
          <RequestsReceived
            key='requestsReceived'
            requestsReceived={requestsReceived}
            userId={user.id}
          />
        )}
        {selectedItem === 'RequestsSent' && (
          <RequestsSent
            key='requestsSent'
            requestsSent={requestsSent}
            userId={user.id}
          />
        )}
        {selectedItem === 'Blockeds' && (
          <Blockeds key='blockeds' blockeds={blockeds} userId={user.id} />
        )}
      </Col>
    </Row>
  )
}

export default Relations
