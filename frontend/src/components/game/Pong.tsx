import { CanvasPong } from './canvas-pong'
import { ApolloError } from '@apollo/client'
import { useState } from 'react'
import { PongGame } from '../../gql/graphql'
import { SubPong } from './subPong'
import { ReadyButton } from './ready-button'
import { LeaveButton } from './leave-button'

type Props = {
  gameId: string
  username: string
  playerId: string
}

export const Pong: React.FC<Props> = (props) => {
  console.log('Pong: gameId = ' + props.gameId)
  let pongGameData: PongGame | null = null
  const [subscriptionError, setGameError] = useState<ApolloError | undefined>(
    undefined
  )

  function setPongGameData(pongData: PongGame) {
    pongGameData = pongData
  }

  function getPongData(): PongGame | null {
    return pongGameData
  }

  if (subscriptionError !== undefined) {
    return (
      <>
        <LeaveButton playerId={props.playerId} gameId={props.gameId} />
        <p>Error, unable to connecto to the game server.</p>
      </>
    )
  }
  return (
    <>
      <SubPong
        gameId={props.gameId}
        updateGameElement={setPongGameData}
        setGameError={setGameError}
      />
      <h1>Pong !</h1>
      <ReadyButton gameId={props.gameId} playerId={props.playerId} />
      <LeaveButton playerId={props.playerId} gameId={props.gameId} />
      <CanvasPong
        gameId={props.gameId}
        playerId={props.playerId}
        getPongData={getPongData}
      />
    </>
  )
}
