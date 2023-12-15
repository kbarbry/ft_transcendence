import { useMutation, useQuery } from '@apollo/client'
import {
  addPlayerToMatchmakingQueue,
  isPlayerQueued,
  removePlayerFromQueue
} from './graphql'
import {
  AddPlayerToMatchmakingQueueMutation,
  AddPlayerToMatchmakingQueueMutationVariables,
  EGameType,
  IsUserInGameQueueQuery,
  IsUserInGameQueueQueryVariables,
  RemovePlayerFromMatchmakingQueueMutation,
  RemovePlayerFromMatchmakingQueueMutationVariables
} from '../../gql/graphql'

type Props = {
  username: string
  playerId: string
  gameType: EGameType
  setGameType: React.Dispatch<React.SetStateAction<EGameType | null>>
}

export const QueueStatus: React.FC<Props> = (props: Props) => {
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError
  } = useQuery<IsUserInGameQueueQuery, IsUserInGameQueueQueryVariables>(
    isPlayerQueued,
    { variables: { userId: props.playerId }, fetchPolicy: 'network-only' }
  )

  const [
    removeFromQueue,
    { data: leaveQueueData, loading: leaveQueueLoading, error: leaveQueueError }
  ] = useMutation<
    RemovePlayerFromMatchmakingQueueMutation,
    RemovePlayerFromMatchmakingQueueMutationVariables
  >(removePlayerFromQueue)

  const [
    addPlayerToMatchmaking,
    { data: addPlayerData, loading: addPlayerLoading, error: addPlayerError }
  ] = useMutation<
    AddPlayerToMatchmakingQueueMutation,
    AddPlayerToMatchmakingQueueMutationVariables
  >(addPlayerToMatchmakingQueue)

  if (addPlayerLoading || leaveQueueLoading || queryLoading) {
    return <button>Loading</button>
  }
  console.log(
    'isPLayerInGameQueue = ' + JSON.stringify(queryData?.isUserInGameQueue)
  )
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
          props.setGameType(null)
        }}
      >
        Leave Queue
      </button>
    )
  }
  if (
    queryError ||
    addPlayerError ||
    leaveQueueError ||
    addPlayerData?.addPlayerToMatchmakingQueue === false ||
    leaveQueueData?.removePlayerFromMatchmakingQueue === false
  ) {
    return <button>Error</button>
  }
  return (
    <button
      onClick={() => {
        addPlayerToMatchmaking({
          variables: {
            nickname: props.username,
            playerId: props.playerId,
            gameType: props.gameType
          },
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
      Join Queue
    </button>
  )
}
