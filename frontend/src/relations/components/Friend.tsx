import React from 'react'
import { useMutation } from '@apollo/client'
import { UserInformations } from '../../store/slices/user-informations.slice'
import { useAppDispatch } from '../../store/hooks'
import { createRelationBlocked, deleteRelationFriend } from '../graphql'
import { setFriendInformations } from '../../store/slices/friend-informations.slice'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'
import {
  CreateRelationBlockedMutation,
  CreateRelationBlockedMutationVariables,
  DeleteRelationFriendMutation,
  DeleteRelationFriendMutationVariables
} from '../../gql/graphql'

interface FriendProps {
  userId: string
  friend: UserInformations
}

const Friend: React.FC<FriendProps> = ({ userId, friend }) => {
  const dispatch = useAppDispatch()

  const [removeFriend] = useMutation<
    DeleteRelationFriendMutation,
    DeleteRelationFriendMutationVariables
  >(deleteRelationFriend)
  const [blockFriend] = useMutation<
    CreateRelationBlockedMutation,
    CreateRelationBlockedMutationVariables
  >(createRelationBlocked)

  const handleRemoveFriendClick = async () => {
    try {
      await removeFriend({ variables: { userAId: userId, userBId: friend.id } })

      await dispatch(setFriendInformations(userId))
    } catch (e) {
      console.log('Error in Friend.tsx RemoveFriend: ', e)
      throw e
    }
  }

  const handleBlockFriendClick = async () => {
    try {
      await blockFriend({
        variables: {
          data: { userBlockingId: userId, userBlockedId: friend.id }
        }
      })

      await dispatch(setFriendInformations(userId))
      await dispatch(setBlockedInformations(userId))
    } catch (e) {
      console.log('Error in Friend.tsx BlockFriend: ', e)
      throw e
    }
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
