import { CanvasPong } from './canvas-pong'
import { ApolloError, useMutation } from '@apollo/client'
import { readyForGame } from './graphql'
import { useState } from 'react'
import {
  PongGame,
  ReadyForGameMutation,
  ReadyForGameMutationVariables
} from '../../gql/graphql'
import { SubPong } from './subPong'

type Props = {
  gameId: string
  username: string
  playerId: string
  quitHandler: () => void
}

export const Pong: React.FC<Props> = (props) => {
  console.log('Pong:')
  let pongGameData: PongGame | null = null
  const [subscriptionError, setGameError] = useState<ApolloError | undefined>(
    undefined
  )
  const [sendReady, { data, loading, error }] = useMutation<
    ReadyForGameMutation,
    ReadyForGameMutationVariables
  >(readyForGame)

  console.log(
    'Pong: data = ' +
      JSON.stringify(data) +
      '\nPong: loading = ' +
      loading +
      '\nPong: error = ' +
      JSON.stringify(error)
  )

  function setPongGameData(pongData: PongGame) {
    pongGameData = pongData
  }

  function getPongData(): PongGame | null {
    return pongGameData
  }

  if (subscriptionError !== undefined) {
    return <p>Error, unable to connecto to the game server.</p>
  }
  return (
    <>
      <SubPong
        gameId={props.gameId}
        updateGameElement={setPongGameData}
        setGameError={setGameError}
      />
      <h1>Pong !</h1>
      <button
        onClick={() => {
          //TODO move in a sub component with possibilitie to unset the ready status
          sendReady({
            variables: { gameId: props.gameId, playerId: props.playerId }
          })
        }}
      >
        Ready
      </button>
      <CanvasPong
        gameId={props.gameId}
        playerId={props.playerId}
        getPongData={getPongData}
      />
      <button onClick={props.quitHandler}>Quit</button>
    </>
  )
}
