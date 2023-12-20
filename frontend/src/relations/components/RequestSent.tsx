import React from 'react'
import { useMutation } from '@apollo/client'
import { useAppDispatch } from '../../store/hooks'
import { createRelationBlocked, deleteRelationRequest } from '../graphql'
import { setRequestSentInformations } from '../../store/slices/request-sent-informations.slice'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'
import {
  CreateRelationBlockedMutation,
  CreateRelationBlockedMutationVariables,
  DeleteRelationRequestsMutation,
  DeleteRelationRequestsMutationVariables,
  User
} from '../../gql/graphql'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import { Button, Space } from 'antd'
import AvatarStatus, { ESize } from '../../common/avatarStatus'
import SuccessNotification from '../../notifications/SuccessNotification'

interface RequestSentProps {
  userId: string
  requestSent: User
}

const RequestSent: React.FC<RequestSentProps> = ({ userId, requestSent }) => {
  const dispatch = useAppDispatch()

  const [removeRequestSent] = useMutation<
    DeleteRelationRequestsMutation,
    DeleteRelationRequestsMutationVariables
  >(deleteRelationRequest)
  const [blockPerson] = useMutation<
    CreateRelationBlockedMutation,
    CreateRelationBlockedMutationVariables
  >(createRelationBlocked)

  const handleRemoveRequestSentClick = async () => {
    try {
      await removeRequestSent({
        variables: { userReceiverId: requestSent.id, userSenderId: userId }
      })

      await dispatch(setRequestSentInformations(userId))
    } catch (Error) {
      const error_message = 'Cannot remove this request'
      ErrorNotification('Error', error_message)
    }
  }

  const handleBlockPersonClick = async () => {
    try {
      await blockPerson({
        variables: {
          data: { userBlockingId: userId, userBlockedId: requestSent.id }
        }
      })
      SuccessNotification(
        'Success',
        'The user is now blocked (You need to refresh or relog to delete their messages from public channels. ) !'
      )

      await dispatch(setRequestSentInformations(userId))
      await dispatch(setBlockedInformations(userId))
    } catch (Error) {
      const error_message = 'Cannot block this user'
      ErrorNotification('Error', error_message)
    }
  }

  return (
    <Space align='center' style={{ marginBottom: '10px' }}>
      <AvatarStatus
        avatarUrl={requestSent.avatarUrl}
        size={ESize.small}
        userId={requestSent.id}
      />
      <span>{requestSent.username}</span>
      <Button onClick={handleRemoveRequestSentClick}>Remove Request</Button>
      <Button danger onClick={handleBlockPersonClick}>
        Block
      </Button>
    </Space>
  )
}

export default RequestSent
