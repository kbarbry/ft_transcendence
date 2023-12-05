import React from 'react'
import { useMutation } from '@apollo/client'
import { UserInformations } from '../../store/slices/user-informations.slice'
import { deleteRelationBlocked } from '../graphql'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'

interface BlockedProps {
  blocked: UserInformations
}

const Blocked: React.FC<BlockedProps> = ({ blocked }) => {
  const user = useAppSelector((state) => state.userInformations.user)
  const dispatch = useAppDispatch()

  if (!user) throw new Error()

  const [unblockUser] = useMutation(deleteRelationBlocked, {
    onCompleted: async () => {
      await dispatch(setBlockedInformations(user.id))
    }
  })

  const handleUnblockClick = () => {
    unblockUser({ variables: { userAId: user.id, userBId: blocked.id } })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={blocked.avatarUrl}
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
