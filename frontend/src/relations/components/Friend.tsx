import React from 'react'
import { useMutation } from '@apollo/client'
import { UserInformations } from '../../store/slices/user-informations.slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { createRelationBlocked, deleteRelationFriend } from '../graphql'
import { setFriendInformations } from '../../store/slices/friend-informations.slice'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'

interface FriendProps {
  friend: UserInformations
}

const Friend: React.FC<FriendProps> = ({ friend }) => {
  const user = useAppSelector((state) => state.userInformations.user)
  const dispatch = useAppDispatch()

  if (!user) throw new Error()

  const [removeFriend] = useMutation(deleteRelationFriend, {
    onCompleted: async () => {
      await dispatch(setFriendInformations(user.id))
    }
  })

  const [blockFriend] = useMutation(createRelationBlocked, {
    onCompleted: async () => {
      await dispatch(setFriendInformations(user.id))
      await dispatch(setBlockedInformations(user.id))
    }
  })

  const handleRemoveFriendClick = () => {
    removeFriend({ variables: { userAId: user.id, userBId: friend.id } })
  }

  const handleBlockFriendClick = () => {
    blockFriend({
      variables: {
        data: { userBlockingId: user.id, userBlockedId: friend.id }
      }
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={friend.avatarUrl}
        alt='Profile'
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px'
        }}
      />

      <span style={{ marginRight: '10px' }}>{friend.username}</span>

      <span style={{ marginRight: '10px' }}>{friend.status}</span>

      <button onClick={handleRemoveFriendClick}>Remove Friend</button>

      <button onClick={handleBlockFriendClick}>Block Friend</button>
    </div>
  )
}

export default Friend
