import React from 'react'
import { WaitingGame } from './waiting-game'

type Props = {
  username: string
  playerId: string
  setGameId: (id: string | null) => void
}

export const Matchmaking: React.FC<Props> = (props) => {
  return (
    <div id='matchmaking'>
      <h1>Matchmaking</h1>
      <WaitingGame username={props.username} playerId={props.playerId} />
    </div>
  )
}
