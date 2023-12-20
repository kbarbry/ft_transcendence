import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useAppDispatch } from '../../store/hooks'
import { createRelationBlocked, deleteRelationFriend } from '../graphql'
import { setFriendInformations } from '../../store/slices/friend-informations.slice'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'
import {
  CreateRelationBlockedMutation,
  CreateRelationBlockedMutationVariables,
  DeleteRelationFriendMutation,
  DeleteRelationFriendMutationVariables,
  User
} from '../../gql/graphql'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import { Button, Divider, Modal, Space } from 'antd'
import AvatarStatus, { ESize } from '../../common/avatarStatus'
import { GameInvitationButton } from '../../components/game-invitation-button/game-invitation'

interface FriendProps {
  userId: string
  friend: User
}

const Friend: React.FC<FriendProps> = ({ userId, friend }) => {
  const dispatch = useAppDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const [removeFriend] = useMutation<
    DeleteRelationFriendMutation,
    DeleteRelationFriendMutationVariables
  >(deleteRelationFriend)
  const [blockFriend] = useMutation<
    CreateRelationBlockedMutation,
    CreateRelationBlockedMutationVariables
  >(createRelationBlocked)

  const handleRemoveFriendClick = async () => {
    try {
      await removeFriend({ variables: { userAId: userId, userBId: friend.id } })

      await dispatch(setFriendInformations(userId))
    } catch (Error) {
      const error_message = 'Cannot remove this friend'
      ErrorNotification('Error', error_message)
    }
  }

  const handleBlockFriendClick = async () => {
    try {
      await blockFriend({
        variables: {
          data: { userBlockingId: userId, userBlockedId: friend.id }
        }
      })

      await dispatch(setFriendInformations(userId))
      await dispatch(setBlockedInformations(userId))
    } catch (Error) {
      const error_message = 'Cannot block this friend'
      ErrorNotification('Error', error_message)
    }
  }

  return (
    <>
      <Space align='center' style={{ marginBottom: '10px' }}>
        <Button
          type='text'
          onClick={showModal}
          style={{ height: '50px', padding: '0px', margin: '0px' }}
        >
          <AvatarStatus
            avatarUrl={friend.avatarUrl}
            size={ESize.small}
            userId={friend.id}
          />
          <span>{friend.username}</span>
        </Button>
        <GameInvitationButton targetPlayerUsername={friend.username} />
        <Button type='default' onClick={handleRemoveFriendClick}>
          Remove Friend
        </Button>
        <Button danger onClick={handleBlockFriendClick}>
          Block Friend
        </Button>
      </Space>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
        width={200}
        centered
      >
        <Space direction='vertical' align='center'>
          <AvatarStatus
            userId={friend.id}
            avatarUrl={friend.avatarUrl}
            size={ESize.large}
          />
          <Divider
            plain
            style={{
              height: '10px',
              margin: '0px',
              marginTop: '20px',
              color: '#777'
            }}
          >
            Username
          </Divider>
          <p>{friend.username}</p>
          <Divider
            plain
            style={{
              height: '5px',
              margin: '0px',
              marginTop: '5px',
              color: '#777'
            }}
          >
            Mail
          </Divider>
          <p>{friend.mail}</p>
          <Divider
            plain
            style={{
              width: '100%',
              height: '10px',
              margin: '0px',
              marginTop: '10px',
              color: '#777'
            }}
          >
            Level
          </Divider>
          <p>{friend.level}</p>
          <Button onClick={handleCancel}>Close</Button>
        </Space>
      </Modal>
    </>
  )
}

export default Friend
