import React from 'react'
import { useMutation } from '@apollo/client'
import { deleteRelationBlocked } from '../graphql'
import { useAppDispatch } from '../../store/hooks'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'
import {
  DeleteRelationBlockedMutation,
  DeleteRelationBlockedMutationVariables,
  User
} from '../../gql/graphql'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import { Button, Space } from 'antd'
import AvatarStatus, { ESize } from '../../common/avatarStatus'

interface BlockedProps {
  userId: string
  blocked: User
}

const Blocked: React.FC<BlockedProps> = ({ userId, blocked }) => {
  const dispatch = useAppDispatch()

  const [unblockUser] = useMutation<
    DeleteRelationBlockedMutation,
    DeleteRelationBlockedMutationVariables
  >(deleteRelationBlocked)

  const handleUnblockClick = async () => {
    try {
      await unblockUser({
        variables: { userAId: userId, userBId: blocked.id }
      })

      await dispatch(setBlockedInformations(userId))
    } catch (Error) {
      const error_message = 'Cannot unblock this user'
      ErrorNotification('Error', error_message)
    }
  }

  return (
    <Space align='center' style={{ marginBottom: '10px' }}>
      <AvatarStatus
        avatarUrl={blocked.avatarUrl}
        size={ESize.small}
        userId={blocked.id}
      />
      <span>{blocked.username}</span>
      <Button onClick={handleUnblockClick}>Unblock</Button>
    </Space>
  )
}

export default Blocked
