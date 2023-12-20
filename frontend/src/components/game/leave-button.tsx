import React from 'react'
import { useAppDispatch } from '../../store/hooks'
import { unsetGameIdValue } from '../../store/slices/gameId.slice'
import { useMutation } from '@apollo/client'
import { QuitGameMutation, QuitGameMutationVariables } from '../../gql/graphql'
import { leaveGame } from './graphql'
import { Button } from 'antd'

type Props = {
  playerId: string
  gameId: string
}

export const LeaveButton: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()
  const [leaveGameMutation] = useMutation<
    QuitGameMutation,
    QuitGameMutationVariables
  >(leaveGame)

  async function leaveHandler() {
    await leaveGameMutation({
      variables: { gameId: props.gameId, playerId: props.playerId }
    })
    dispatch(unsetGameIdValue())
  }

  return (
    <Button danger={true} onClick={leaveHandler}>
      Leave Game
    </Button>
  )
}
