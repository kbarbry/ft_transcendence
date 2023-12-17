import React from 'react'
import {
  GameInvitationState,
  removeOneInvitationValue
} from '../../store/slices/gameInvitations.slice'
import { useAppDispatch } from '../../store/hooks'
import { setGameIdValue } from '../../store/slices/gameId.slice'
import { Button, Flex } from 'antd'
import { useQuery } from '@apollo/client'
import { isGameValid } from '../game/graphql'
import { IsGameValidQuery, IsGameValidQueryVariables } from '../../gql/graphql'

type Props = {
  invitation: GameInvitationState
  userId: string
}
export const Invitation: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()

  const { data, loading, error } = useQuery<
    IsGameValidQuery,
    IsGameValidQueryVariables
  >(isGameValid, {
    skip: props.invitation.gameId === null,
    variables: { gameId: props.invitation.gameId, userId: props.userId },
    fetchPolicy: 'cache-and-network'
  })

  if (loading) {
    return <p>Loading... </p>
  }
  if (error) {
    console.log('Invitation: error = ' + JSON.stringify(error, undefined, 3))
    return <p>Error</p>
  }
  if (data && data.isGameValid === false) {
    //TODO dispatch(removeOneInvitationValue(props.invitation.gameId)) remove component, dispatch probleme
    return null
  }
  return (
    <Flex vertical={false}>
      <Flex vertical={true}>
        <p>From: {props.invitation.senderUsername}</p>
        <p>Game Type: {props.invitation.gameType}</p>
      </Flex>
      <Flex vertical={true}>
        <Button
          onClick={() => {
            dispatch(setGameIdValue(props.invitation.gameId))
            dispatch(removeOneInvitationValue(props.invitation.gameId))
          }}
        >
          Accept
        </Button>
        <Button
          danger={true}
          onClick={() =>
            dispatch(removeOneInvitationValue(props.invitation.gameId))
          }
        >
          Decline
        </Button>
      </Flex>
    </Flex>
  )
}
