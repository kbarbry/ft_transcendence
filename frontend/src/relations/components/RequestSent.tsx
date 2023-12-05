import React from 'react'
import { useMutation } from '@apollo/client'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { createRelationBlocked, deleteRelationRequest } from '../graphql'
import { setRequestSentInformations } from '../../store/slices/request-sent-informations.slice'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'
import { UserInformations } from '../../store/slices/user-informations.slice'

interface RequestSentProps {
  requestSent: UserInformations
}

const RequestSent: React.FC<RequestSentProps> = ({ requestSent }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userInformations.user)

  if (!user) throw new Error()

  const [removeRequestSent] = useMutation(deleteRelationRequest, {
    onCompleted: async () => {
      await dispatch(setRequestSentInformations(user.id))
    }
  })

  const [blockPerson] = useMutation(createRelationBlocked, {
    onCompleted: async () => {
      await dispatch(setRequestSentInformations(user.id))
      await dispatch(setBlockedInformations(user.id))
    }
  })

  const handleRemoveRequestSentClick = () => {
    removeRequestSent({
      variables: { userReceiverId: requestSent.id, userSenderId: user.id }
    })
  }

  const handleBlockPersonClick = () => {
    blockPerson({
      variables: {
        data: { userBlockingId: user.id, userBlockedId: requestSent.id }
      }
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={requestSent.avatarUrl}
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
