import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Invitation } from './invitation'
import { Button } from 'antd'
import { clearInvitations } from '../../store/slices/gameInvitations.slice'

type Props = {
  playerId: string
}

export const GameInvitationPanel: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()

  const invitations = useAppSelector(
    (state) => state.gameInvitationsInformation
  )

  const invitationElements = invitations.map((invitation, index) => (
    <Invitation invitation={invitation} userId={props.playerId} key={index} />
  ))

  return (
    <div className='game-invitations-panel'>
      <h2>Invitations to games</h2>
      <Button danger={true} onClick={() => dispatch(clearInvitations())}>
        Clear all
      </Button>
      <ul>{invitationElements}</ul>
    </div>
  )
}
