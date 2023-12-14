import React from 'react'
import { useMutation } from '@apollo/client'
import {
  EGameType,
  SendPongInvitationMutation,
  SendPongInvitationMutationVariables,
  User
} from '../../gql/graphql'
import { gameInvitationMutation } from './graphql'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setGameIdValue } from '../../store/slices/gameId.slice'

type Props = {
  targetPlayerUsername: string
}
export const GameInvitationButton: React.FC<Props> = (props: Props) => {
  const user: User | null = useAppSelector(
    (state) => state.userInformations.user
  )
  if (user === null) {
    return null
  }

  const dispatch = useAppDispatch()
  const [invite, { data, error }] = useMutation<
    SendPongInvitationMutation,
    SendPongInvitationMutationVariables
  >(gameInvitationMutation)

  if (error) {
    return (
      <div className='game-invitation'>
        <p>An error occured during invitation</p>
      </div>
    )
  }
  if (data) {
    if (data.sendPongInvitation) {
      dispatch(setGameIdValue(data.sendPongInvitation))
    } else {
      return (
        <div className='game-invitation'>
          <p>Unable to invite</p>
        </div>
      )
    }
  }
  return (
    <div className='game-invitation'>
      <p>Invitation :</p>
      <button
        className='classic-game'
        onClick={() => {
          invite({
            variables: {
              gameType: EGameType.Classic,
              receiverNickname: props.targetPlayerUsername,
              senderId: user.id,
              senderNickname: user.username
            }
          })
        }}
      >
        Classic
      </button>
      <button
        className='special-game'
        onClick={() => {
          invite({
            variables: {
              gameType: EGameType.Special,
              receiverNickname: props.targetPlayerUsername,
              senderId: user.id,
              senderNickname: user.username
            }
          })
        }}
      >
        Special
      </button>
    </div>
  )
}
