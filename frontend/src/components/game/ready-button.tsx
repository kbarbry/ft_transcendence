import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { isUserReadyInGame, readyForGame } from './graphql'
import {
  IsUserReadyInGameQuery,
  IsUserReadyInGameQueryVariables,
  ReadyForGameMutation,
  ReadyForGameMutationVariables
} from '../../gql/graphql'
import { Button } from 'antd'

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
    return <Button danger={true}>Error</Button>
  }
  if (mutationData) {
    if (mutationData.readyForGame === false) {
      return <Button>Error</Button>
    }
    if (mutationData.readyForGame === true) {
      return <Button>You're in !</Button>
    }
  }
  if (gameReadyData && gameReadyData.isUserReadyInGame) {
    return <Button>You're in !</Button>
  }
  if (gameReadyLoading) {
    return <Button>Loading</Button>
  }
  return (
    <Button
      onClick={() => {
        sendReady({
          variables: { gameId: props.gameId, playerId: props.playerId }
        })
      }}
    >
      Ready !
    </Button>
  )
}
