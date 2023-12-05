import React from 'react'
import { useMutation } from '@apollo/client'
import { UserInformations } from '../../store/slices/user-informations.slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  createRelationBlocked,
  createRelationRequest,
  deleteRelationRequest
} from '../graphql'
import { setFriendInformations } from '../../store/slices/friend-informations.slice'
import { setRequestReceivedInformations } from '../../store/slices/request-received-informations.slice'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'

interface RequestReceivedProps {
  requestReceived: UserInformations
}

const RequestReceived: React.FC<RequestReceivedProps> = ({
  requestReceived
}) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userInformations.user)

  if (!user) throw new Error()

  const [acceptRequest] = useMutation(createRelationRequest, {
    onCompleted: async () => {
      await dispatch(setRequestReceivedInformations(user.id))
      await dispatch(setFriendInformations(user.id))
    }
  })

  const [refuseRequest] = useMutation(deleteRelationRequest, {
    onCompleted: async () => {
      await dispatch(setRequestReceivedInformations(user.id))
    }
  })

  const [blockUser] = useMutation(createRelationBlocked, {
    onCompleted: async () => {
      await dispatch(setRequestReceivedInformations(user.id))
      await dispatch(setBlockedInformations(user.id))
    }
  })

  const handleAcceptRequestClick = () => {
    acceptRequest({
      variables: {
        data: { userSenderId: user.id, userReceiverId: requestReceived.id }
      }
    })
  }

  const handleRefuseRequestClick = () => {
    refuseRequest({
      variables: { userReceiverId: user.id, userSenderId: requestReceived.id }
    })
  }

  const handleBlockUserClick = () => {
    blockUser({
      variables: {
        data: {
          userBlockingId: user.id,
          userBlockedId: requestReceived.id
        }
      }
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={requestReceived.avatarUrl}
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
