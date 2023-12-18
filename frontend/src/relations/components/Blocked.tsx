import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { deleteRelationBlocked } from '../graphql'
import { useAppDispatch } from '../../store/hooks'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'
import {
  DeleteRelationBlockedMutation,
  DeleteRelationBlockedMutationVariables,
  User
} from '../../gql/graphql'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'
import ErrorNotification from '../../notifications/ErrorNotificartion'


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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={blocked?.avatarUrl ? blocked.avatarUrl : DefaultProfilePicture}
        alt='Profile'
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px'
        }}
      />

      <span style={{ marginRight: '10px' }}>{blocked.username}</span>

      <button onClick={handleUnblockClick}>Unblock</button>
    </div>
  )
}

export default Blocked
