import { CanvasPong } from './canvas-pong'
import { useMutation } from '@apollo/client'
import { readyForGame } from './graphql'

type Props = {
  gameId: string
  username: string
  quitHandler: () => void
}

export const Pong: React.FC<Props> = (props) => {
  console.log('Pong:')

  const [sendReady, { data, loading, error }] = useMutation(readyForGame)

  console.log('Pong: data = ' + JSON.stringify(data))
  console.log('Pong: loading = ' + loading)
  console.log('Pong: error = ' + JSON.stringify(error))

  return (
    <>
      <h1>Pong</h1>
      <p>Player 1</p>
      <p>Player 2</p>
      <button
        onClick={() => {
          sendReady({
            variables: { gameId: props.gameId, playerId: props.username }
          })
        }}
      >
        Set Presence True
      </button>
      <CanvasPong gameId={props.gameId} />
      <button onClick={props.quitHandler}>Quit</button>
    </>
  )
}
