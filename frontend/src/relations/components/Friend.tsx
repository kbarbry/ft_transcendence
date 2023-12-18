import React from 'react'
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
import { Button, Space } from 'antd'
import AvatarStatus, { ESize } from '../../common/avatarStatus'

interface FriendProps {
  userId: string
  friend: User
}

const Friend: React.FC<FriendProps> = ({ userId, friend }) => {
  const dispatch = useAppDispatch()

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
    <Space align='center' style={{ marginBottom: '10px' }}>
      <AvatarStatus
        avatarUrl={friend.avatarUrl}
        size={ESize.small}
        userId={friend.id}
      />
      <span>{friend.username}</span>
      <Button type='default' onClick={handleRemoveFriendClick}>
        Remove Friend
      </Button>
      <Button danger onClick={handleBlockFriendClick}>
        Block Friend
      </Button>
    </Space>
  )
}

export default Friend
