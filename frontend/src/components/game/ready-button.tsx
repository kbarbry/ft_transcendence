import { useMutation } from '@apollo/client'
import React from 'react'
import {
  ReadyForGameMutation,
  ReadyForGameMutationVariables
} from '../../gql/graphql'
import { readyForGame } from './graphql'

type Props = {
  gameId: string
  playerId: string
}

export const ReadyButton: React.FC<Props> = (props: Props) => {
  const [sendReady, { data, error }] = useMutation<
    ReadyForGameMutation,
    ReadyForGameMutationVariables
  >(readyForGame)

  if (error) {
    return <p>An error occured, unable to be ready</p>
  }
  if (data) {
    if (data.readyForGame === false) {
      return <p>Unable to be ready</p>
    }
    if (data.readyForGame === true) {
      return <p>You're ready !</p>
    }
  }
  return (
    <button
      onClick={() => {
        sendReady({
          variables: { gameId: props.gameId, playerId: props.playerId }
        })
      }}
    >
      Ready
    </button>
  )
}
