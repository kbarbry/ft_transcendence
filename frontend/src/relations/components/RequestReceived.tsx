import React from 'react'
import { useMutation } from '@apollo/client'
import { useAppDispatch } from '../../store/hooks'
import {
  createRelationBlocked,
  createRelationRequest,
  deleteRelationRequest
} from '../graphql'
import { setFriendInformations } from '../../store/slices/friend-informations.slice'
import { setRequestReceivedInformations } from '../../store/slices/request-received-informations.slice'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'
import {
  CreateRelationBlockedMutation,
  CreateRelationBlockedMutationVariables,
  CreateRelationRequestsMutation,
  CreateRelationRequestsMutationVariables,
  DeleteRelationRequestsMutation,
  DeleteRelationRequestsMutationVariables,
  User
} from '../../gql/graphql'
import { setRequestSentInformations } from '../../store/slices/request-sent-informations.slice'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import SuccessNotification from '../../notifications/SuccessNotification'
import { Button, Space } from 'antd'
import AvatarStatus, { ESize } from '../../common/avatarStatus'

interface RequestReceivedProps {
  userId: string
  requestReceived: User
}

const RequestReceived: React.FC<RequestReceivedProps> = ({
  userId,
  requestReceived
}) => {
  const dispatch = useAppDispatch()

  const [acceptRequest] = useMutation<
    CreateRelationRequestsMutation,
    CreateRelationRequestsMutationVariables
  >(createRelationRequest)

  const [refuseRequest] = useMutation<
    DeleteRelationRequestsMutation,
    DeleteRelationRequestsMutationVariables
  >(deleteRelationRequest)

  const [blockUser] = useMutation<
    CreateRelationBlockedMutation,
    CreateRelationBlockedMutationVariables
  >(createRelationBlocked)

  const handleAcceptRequestClick = async () => {
    try {
      await acceptRequest({
        variables: {
          data: { userSenderId: userId, userReceiverId: requestReceived.id }
        }
      })

      await dispatch(setRequestReceivedInformations(userId))
      await dispatch(setFriendInformations(userId))
      SuccessNotification('success', `You are now friends !`)
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Error', error_message)
    }
  }

  const handleRefuseRequestClick = async () => {
    try {
      await refuseRequest({
        variables: { userReceiverId: userId, userSenderId: requestReceived.id }
      })

      await dispatch(setRequestSentInformations(userId))
      await dispatch(setRequestReceivedInformations(userId))
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Error', error_message)
    }
  }

  const handleBlockUserClick = async () => {
    try {
      await blockUser({
        variables: {
          data: {
            userBlockingId: userId,
            userBlockedId: requestReceived.id
          }
        }
      })
      SuccessNotification(
        'Success',
        'The user is now blocked (You need to refresh or relog to delete their messages from public channels. ) !'
      )

      await dispatch(setRequestReceivedInformations(userId))
      await dispatch(setBlockedInformations(userId))
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Error', error_message)
    }
  }

  return (
    <Space align='center' style={{ marginBottom: '10px' }}>
      <AvatarStatus
        avatarUrl={requestReceived.avatarUrl}
        size={ESize.small}
        userId={requestReceived.id}
      />
      <span>{requestReceived.username}</span>
      <Button type='primary' onClick={handleAcceptRequestClick}>
        Accept
      </Button>
      <Button onClick={handleRefuseRequestClick}>Refuse</Button>
      <Button danger onClick={handleBlockUserClick}>
        Block
      </Button>
    </Space>
  )
}

export default RequestReceived
