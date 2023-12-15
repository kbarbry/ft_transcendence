import React, { useState } from 'react'
import { GameSelection } from './game-selection'
import {
  EGameType,
  IsUserInGameQueueQuery,
  IsUserInGameQueueQueryVariables,
  RemovePlayerFromMatchmakingQueueMutation,
  RemovePlayerFromMatchmakingQueueMutationVariables
} from '../../gql/graphql'
import { useMutation, useQuery } from '@apollo/client'
import { isPlayerQueued, removePlayerFromQueue } from './graphql'
import { QueueStatus } from './queue-status'

type Props = {
  username: string
  playerId: string
}

export const WaitingGame: React.FC<Props> = (props: Props) => {
  const [gameType, setGameType] = useState<EGameType | null>(null)
  console.log('Matchmaking: gameType = ' + gameType)

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError
  } = useQuery<IsUserInGameQueueQuery, IsUserInGameQueueQueryVariables>(
    isPlayerQueued,
    { variables: { userId: props.playerId }, fetchPolicy: 'cache-and-network' }
  )

  const [
    removeFromQueue,
    { loading: leaveQueueLoading, error: leaveQueueError }
  ] = useMutation<
    RemovePlayerFromMatchmakingQueueMutation,
    RemovePlayerFromMatchmakingQueueMutationVariables
  >(removePlayerFromQueue)

  if (queryLoading || leaveQueueLoading) {
    return <p>Loading...</p>
  }
  if (queryError || leaveQueueError) {
    return <p>Error while requesting the server</p>
  }
  if (queryData?.isUserInGameQueue === true) {
    return (
      <button
        onClick={() => {
          removeFromQueue({
            variables: { playerId: props.playerId },
            refetchQueries: [
              {
                query: isPlayerQueued,
                variables: { userId: props.playerId },
                fetchPolicy: 'network-only'
              }
            ]
          })
        }}
      >
        Leave Queue
      </button>
    )
  }
  if (gameType === null) {
    return (
      <>
        <GameSelection
          username={props.username}
          playerId={props.playerId}
          setGameType={setGameType}
        />
      </>
    )
  }
  return (
    <QueueStatus
      username={props.username}
      playerId={props.playerId}
      gameType={gameType}
      setGameType={setGameType}
    />
  )
}
