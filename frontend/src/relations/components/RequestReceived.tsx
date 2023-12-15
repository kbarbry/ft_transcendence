import React, { useState } from 'react'
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
import DefaultProfilePicture from '/DefaultProfilePicture.svg'
import PopUpError from '../../ErrorPages/PopUpError'

interface RequestReceivedProps {
  userId: string
  requestReceived: User
}

const RequestReceived: React.FC<RequestReceivedProps> = ({
  userId,
  requestReceived
}) => {
  const dispatch = useAppDispatch()
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
    } catch (Error) {
      const error_message = (Error as Error).message
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  const handleRefuseRequestClick = async () => { // Todoo DONT FORGET TO FIX
    try {
      await refuseRequest({
        variables: { userReceiverId: userId, userSenderId: requestReceived.id }
      })

      await dispatch(setRequestSentInformations(userId))
      await dispatch(setRequestReceivedInformations(userId))
    } catch (Error) {
      const error_message = (Error as Error).message
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  const handleBlockUserClick = async () => {
    try {
      await blockUser({
        variables: {
          data: {
            userBlockingId: userId,
            userBlockedId: 'requestReceived.id'
          }
        }
      })

      await dispatch(setRequestReceivedInformations(userId))
      await dispatch(setBlockedInformations(userId))
    } catch (Error) {
      const error_message = 'Cannot block this user'
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {isError && <PopUpError message={errorMessage} />}

      <img
        src={
          requestReceived?.avatarUrl
            ? requestReceived.avatarUrl
            : DefaultProfilePicture
        }
        alt='Avatar'
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px'
        }}
      />

      <span style={{ marginRight: '10px' }}>{requestReceived.username}</span>

      <button onClick={handleAcceptRequestClick}>Accept</button>
      <button onClick={handleRefuseRequestClick}>Refuse</button>
      <button onClick={handleBlockUserClick}>Block</button>
    </div>
  )
}

export default RequestReceived
