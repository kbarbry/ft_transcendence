import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useAppDispatch } from '../../store/hooks'
import { createRelationBlocked, deleteRelationFriend } from '../graphql'
import { setFriendInformations } from '../../store/slices/friend-informations.slice'
import { setBlockedInformations } from '../../store/slices/blocked-informations.slice'
import {
  CreateRelationBlockedMutation,
  CreateRelationBlockedMutationVariables,
  DeleteRelationFriendMutation,
  DeleteRelationFriendMutationVariables,
  User
} from '../../gql/graphql'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'
import PopUpError from '../../ErrorPages/PopUpError'

interface FriendProps {
  userId: string
  friend: User
}

const Friend: React.FC<FriendProps> = ({ userId, friend }) => {
  const dispatch = useAppDispatch()
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
    } catch (Error) {
      const error_message = 'Cannot remove this friend'
      setIsError(true)
      setErrorMessage(error_message)
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
    } catch (Error) {
      const error_message = 'Cannot block this friend'
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {isError && <PopUpError message={errorMessage} />}
      <img
        src={friend?.avatarUrl ? friend.avatarUrl : DefaultProfilePicture}
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
