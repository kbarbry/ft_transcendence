import { useMutation } from '@apollo/client'
import React from 'react'
import { addPlayerToMatchmakingQueue } from './graphql'
import { SubMatchmaking } from './subMatchmaking'

type Props = {
  username: string
  setGameId: React.Dispatch<React.SetStateAction<string | null>>
}

export const WaitingGame: React.FC<Props> = (props: Props) => {
  const [addPlayerToMatchmaking] = useMutation(addPlayerToMatchmakingQueue)

  return (
    <>
      <SubMatchmaking username={props.username} setGameId={props.setGameId} />
      <h1>Waiting Game</h1>
      <button
        onClick={() => {
          addPlayerToMatchmaking({
            variables: { nickname: props.username, playerId: props.username }
          })
        }}
      >
        Join Queue
      </button>
    </>
  )
}
