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
import DefaultProfilePicture from '/DefaultProfilePicture.svg'

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
    } catch (e) {
      console.log('Error in RequestSent.tsx RemoveRequest: ', e)
      throw e
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
    } catch (e) {
      console.log('Error in RequestSent.tsx BlockPerson: ', e)
      throw e
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
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
