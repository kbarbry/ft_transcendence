import React, { useState } from 'react'
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
import DefaultProfilePicture from '/DefaultProfilePicture.svg'
import PopUpError from '../../ErrorPages/PopUpError'

interface RequestSentProps {
  userId: string
  requestSent: User
}

const RequestSent: React.FC<RequestSentProps> = ({ userId, requestSent }) => {
  const dispatch = useAppDispatch()
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
      const error_message = (Error as Error).message
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  const handleBlockPersonClick = async () => {
    try {
      await blockPerson({
        variables: {
          data: { userBlockingId: userId, userBlockedId: requestSent.id }
        }
      })

      await dispatch(setRequestSentInformations(userId))
      await dispatch(setBlockedInformations(userId))
    } catch (Error) {
      const error_message = (Error as Error).message
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {isError && <PopUpError message={errorMessage} />}

      <img
        src={
          requestSent?.avatarUrl ? requestSent.avatarUrl : DefaultProfilePicture
        }
        alt='Avatar'
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px'
        }}
      />

      <span style={{ marginRight: '10px' }}>{requestSent.username}</span>

      <button onClick={handleRemoveRequestSentClick}>Remove Request</button>
      <button onClick={handleBlockPersonClick}>Block Person</button>
    </div>
  )
}

export default RequestSent
