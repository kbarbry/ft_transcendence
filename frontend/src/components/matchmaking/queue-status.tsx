import { useMutation, useQuery } from '@apollo/client'
import { addPlayerToMatchmakingQueue, isPlayerQueued } from './graphql'
import {
  AddPlayerToMatchmakingQueueMutation,
  AddPlayerToMatchmakingQueueMutationVariables,
  EGameType,
  IsUserInGameQueueQuery,
  IsUserInGameQueueQueryVariables
} from '../../gql/graphql'

type Props = {
  username: string
  playerId: string
  gameType: EGameType
  setGameId: (id: string | null) => void
}

export const QueueStatus: React.FC<Props> = (props: Props) => {
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError
  } = useQuery<IsUserInGameQueueQuery, IsUserInGameQueueQueryVariables>(
    isPlayerQueued,
    { variables: { userId: props.playerId }, fetchPolicy: 'cache-and-network' }
  )
  const [addPlayerToMatchmaking, { data, loading, error }] = useMutation<
    AddPlayerToMatchmakingQueueMutation,
    AddPlayerToMatchmakingQueueMutationVariables
  >(addPlayerToMatchmakingQueue)

  if (loading || queryLoading) {
    return <button>Loading</button>
  }
  if (
    queryData?.isUserInGameQueue === true ||
    data?.addPlayerToMatchmakingQueue === true
  ) {
    return <button>Queue Joined</button>
  }
  if (data?.addPlayerToMatchmakingQueue === false || error || queryError) {
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
          }
        })
      }}
    >
      Join Queue
    </button>
  )
}
