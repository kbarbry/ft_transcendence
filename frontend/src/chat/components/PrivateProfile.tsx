import React, { useState } from 'react'
import {
  CreateRelationBlockedMutation,
  CreateRelationBlockedMutationVariables,
  DeleteRelationFriendMutation,
  DeleteRelationFriendMutationVariables,
  User
} from '../../gql/graphql'
import AvatarStatus, { ESize } from '../../common/avatarStatus'
import { Button, Modal, Space } from 'antd'
import {
  createRelationBlocked,
  deleteRelationFriend
} from '../../relations/graphql'
import { useMutation } from '@apollo/client'
import { useAppDispatch } from '../../store/hooks'
import { setFriendInformations } from '../../store/slices/friend-informations.slice'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import { GameInvitationButton } from '../../components/game-invitation-button/game-invitation'

interface PrivateProfileProps {
  userId: string
  member: User
}

const PrivateProfile: React.FC<PrivateProfileProps> = ({ userId, member }) => {
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

  const handleBlockFriendClick = async () => {
    try {
      await blockFriend({
        variables: {
          data: { userBlockingId: userId, userBlockedId: member.id }
        }
      })

      await dispatch(setFriendInformations(userId))
      await dispatch(setBlockedInformations(userId))
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Profile', error_message)
    }
  }

  const handleRemoveFriendClick = async () => {
    try {
      await removeFriend({ variables: { userAId: userId, userBId: member.id } })

      await dispatch(setFriendInformations(userId))
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Profile', error_message)
    }
  }

  return (
    <>
      <Button type='text' onClick={showModal} style={{ height: '50px' }}>
        <Space>
          <AvatarStatus
            userId={member.id}
            avatarUrl={member.avatarUrl}
            size={ESize.small}
          />
          <span>{member.username}</span>
        </Space>
      </Button>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={200}
        centered
      >
        <Space direction='vertical' align='center'>
          <AvatarStatus
            userId={member.id}
            avatarUrl={member.avatarUrl}
            size={ESize.large}
          />
          <p>{member.username}</p>
          {member.id !== userId && (
            <>
              <GameInvitationButton targetPlayerUsername={member.username} />
              <Button onClick={handleRemoveFriendClick} danger>
                Remove Friend
              </Button>
              <Button onClick={handleBlockFriendClick} danger>
                Block Friend
              </Button>
            </>
          )}

          <Button onClick={handleCancel}>Close</Button>
        </Space>
      </Modal>
    </>
  )
}

export default PrivateProfile
