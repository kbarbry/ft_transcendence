import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { isUserReadyInGame, readyForGame } from './graphql'
import {
  IsUserReadyInGameQuery,
  IsUserReadyInGameQueryVariables,
  ReadyForGameMutation,
  ReadyForGameMutationVariables
} from '../../gql/graphql'

type Props = {
  gameId: string
  playerId: string
}

export const ReadyButton: React.FC<Props> = (props: Props) => {
  const {
    data: gameReadyData,
    loading: gameReadyLoading,
    error: gameReadyError
  } = useQuery<IsUserReadyInGameQuery, IsUserReadyInGameQueryVariables>(
    isUserReadyInGame,
    {
      variables: { gameId: props.gameId, userId: props.playerId },
      fetchPolicy: 'cache-and-network'
    }
  )

  const [sendReady, { data: mutationData, error: mutationError }] = useMutation<
    ReadyForGameMutation,
    ReadyForGameMutationVariables
  >(readyForGame)

  if (gameReadyError || mutationError) {
    if (gameReadyError) {
      console.log(
        'gameReadyError : ' + JSON.stringify(gameReadyError, undefined, 3)
      )
    }
    return <button>Error</button>
  }
  if (mutationData) {
    if (mutationData.readyForGame === false) {
      return <button>Error</button>
    }
    if (mutationData.readyForGame === true) {
      return <button>Waiting Player</button>
    }
  }
  if (gameReadyData && gameReadyData.isUserReadyInGame) {
    return <button>Waiting Player</button>
  }
  if (gameReadyLoading) {
    return <button>Loading</button>
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
