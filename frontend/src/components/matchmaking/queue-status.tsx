import { useMutation } from '@apollo/client'
import { addPlayerToMatchmakingQueue } from './graphql'
import {
  AddPlayerToMatchmakingQueueMutation,
  AddPlayerToMatchmakingQueueMutationVariables
} from '../../gql/graphql'

type Props = {
  username: string
  playerId: string
  setGameId: React.Dispatch<React.SetStateAction<string | null>>
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
          variables: { nickname: props.username, playerId: props.playerId }
        })
      }}
    >
      Join Queue
    </button>
  )
}
