import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { Invitation } from './invitation'
import { Divider, Flex } from 'antd'

type Props = {
  playerId: string
}

export const GameInvitationPanel: React.FC<Props> = (props: Props) => {
  const invitations = useAppSelector(
    (state) => state.gameInvitationsInformation
  )

  const invitationElements = invitations.map((invitation, index) => (
    <Invitation invitation={invitation} userId={props.playerId} key={index} />
  ))

  return (
    <Flex vertical={true}>
      <h2>Invitations to games</h2>
      <Divider />
      <ul>{invitationElements}</ul>
    </Flex>
  )
}
