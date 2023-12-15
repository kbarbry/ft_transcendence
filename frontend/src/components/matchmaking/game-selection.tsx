import React from 'react'
import {
  AddPlayerToMatchmakingQueueMutation,
  AddPlayerToMatchmakingQueueMutationVariables,
  EGameType,
  IsUserInGameQueueQuery,
  IsUserInGameQueueQueryVariables,
  RemovePlayerFromMatchmakingQueueMutation,
  RemovePlayerFromMatchmakingQueueMutationVariables
} from '../../gql/graphql'
import { GameInvitationPanel } from '../game-invitation-panel/game-invitations-panel'
import { useMutation, useQuery } from '@apollo/client'
import {
  addPlayerToMatchmakingQueue,
  isPlayerQueued,
  removePlayerFromQueue
} from './graphql'

type Props = {
  username: string
  playerId: string
}

export const GameSelection: React.FC<Props> = (props) => {
  console.log('GameSelection')

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError
  } = useQuery<IsUserInGameQueueQuery, IsUserInGameQueueQueryVariables>(
    isPlayerQueued,
    { variables: { userId: props.playerId }, fetchPolicy: 'cache-and-network' }
  )

  const [
    addPlayerToMatchmaking,
    { loading: addPlayerLoading, error: addPlayerError }
  ] = useMutation<
    AddPlayerToMatchmakingQueueMutation,
    AddPlayerToMatchmakingQueueMutationVariables
  >(addPlayerToMatchmakingQueue)

  function join(type: EGameType) {
    addPlayerToMatchmaking({
      variables: {
        nickname: props.username,
        playerId: props.playerId,
        gameType: type
      },
      refetchQueries: [
        {
          query: isPlayerQueued,
          variables: { userId: props.playerId },
          fetchPolicy: 'network-only'
        }
      ]
    })
  }

  const [
    removeFromQueue,
    { loading: leaveQueueLoading, error: leaveQueueError }
  ] = useMutation<
    RemovePlayerFromMatchmakingQueueMutation,
    RemovePlayerFromMatchmakingQueueMutationVariables
  >(removePlayerFromQueue)

  if (queryLoading || leaveQueueLoading || addPlayerLoading) {
    return <p>Loading...</p>
  }
  if (queryError || leaveQueueError || addPlayerError) {
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
  return (
    <div className='game-selection'>
      <h2>Hello {props.username}, select your game type :</h2>
      <button onClick={() => join(EGameType.Classic)}>Classic Game</button>
      <button onClick={() => join(EGameType.Special)}>Extra Game</button>
      <GameInvitationPanel playerId={props.playerId} />
    </div>
  )
}
