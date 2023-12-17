import { useMutation } from '@apollo/client'
import { addPlayerToMatchmakingQueue } from './graphql'
import {
  AddPlayerToMatchmakingQueueMutation,
  AddPlayerToMatchmakingQueueMutationVariables,
  EGameType
} from '../../gql/graphql'

type Props = {
  username: string
  playerId: string
  gameType: EGameType
  setGameId: (id: string | null) => void
}

export const QueueStatus: React.FC<Props> = (props: Props) => {
  const [addPlayerToMatchmaking, { data, loading, error }] = useMutation<
    AddPlayerToMatchmakingQueueMutation,
    AddPlayerToMatchmakingQueueMutationVariables
  >(addPlayerToMatchmakingQueue)

  if (loading) {
    return <p>Joining game queue.</p>
  }
  if (data?.addPlayerToMatchmakingQueue === true) {
    return <p>Game queue joined.</p>
  }
  if (data?.addPlayerToMatchmakingQueue === false || error !== undefined) {
    return <p>An error occured, unable to join the game queue.</p>
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