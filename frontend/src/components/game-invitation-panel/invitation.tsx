import React, { useEffect } from 'react'
import {
  GameInvitationState,
  removeOneInvitationValue
} from '../../store/slices/gameInvitations.slice'
import { useAppDispatch } from '../../store/hooks'
import { setGameIdValue } from '../../store/slices/gameId.slice'
import { Button, Divider, Flex } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { isGameValid, leaveGame } from '../game/graphql'
import {
  IsGameValidQuery,
  IsGameValidQueryVariables,
  QuitGameMutation,
  QuitGameMutationVariables
} from '../../gql/graphql'

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
    variables: { gameId: props.invitation.gameId, userId: props.userId },
    pollInterval: 500,
    fetchPolicy: 'network-only'
  })

  const [leaveGameMutation] = useMutation<
    QuitGameMutation,
    QuitGameMutationVariables
  >(leaveGame)

  async function declineHandler() {
    await leaveGameMutation({
      variables: { gameId: props.invitation.gameId, playerId: props.userId }
    })
    dispatch(removeOneInvitationValue(props.invitation.gameId))
  }

  useEffect(() => {
    if (data && data.isGameValid === false) {
      dispatch(removeOneInvitationValue(props.invitation.gameId))
    }
  })

  if (loading) {
    return <p>Loading... </p>
  }
  if (error) {
    return <p>Error</p>
  }
  return (
    <Flex vertical={true}>
      <p>From: {props.invitation.senderUsername}</p>
      <p>Game Type: {props.invitation.gameType}</p>
      <Button
        onClick={() => {
          dispatch(setGameIdValue(props.invitation.gameId))
          dispatch(removeOneInvitationValue(props.invitation.gameId))
        }}
      >
        Accept
      </Button>
      <Button danger={true} onClick={declineHandler}>
        Decline
      </Button>
      <Divider />
    </Flex>
  )
}
