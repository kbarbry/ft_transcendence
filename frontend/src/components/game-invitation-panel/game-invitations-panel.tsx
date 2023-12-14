import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeOneInvitationValue } from '../../store/slices/gameInvitations.slice'
import { setGameIdValue } from '../../store/slices/gameId.slice'

type Props = {
  playerId: string
}

export const GameInvitationPanel: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()
  //TODO dispatch(updateGameInvitations(props.playerId))

  const invitations = useAppSelector(
    (state) => state.gameInvitationsInformation
  )

  const invitationElements = invitations.map((invitation, index) => (
    <li className='showcase-element' key={index}>
      <p>
        From:{' '}
        {invitation.senderUsername
          ? invitation.senderUsername
          : 'username is null'}
      </p>
      <p>
        Game Type:{' '}
        {invitation.gameType ? invitation.gameType : 'invitation is null'}
      </p>
      <button
        onClick={() => {
          dispatch(setGameIdValue(invitation.gameId))
          dispatch(removeOneInvitationValue(invitation.gameId))
        }}
      >
        Accept
      </button>
      <button
        onClick={() => dispatch(removeOneInvitationValue(invitation.gameId))}
      >
        Decline
      </button>
    </li>
  ))

  return (
    <div className='game-invitations-panel'>
      <h2>Invitations to games</h2>
      <button>Clear all</button>
      <ul>{invitationElements}</ul>
    </div>
  )
}
