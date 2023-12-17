import React from 'react'
import { GameSelection } from './game-selection'

type Props = {
  username: string
  playerId: string
}

export const Matchmaking: React.FC<Props> = (props) => {
  return (
    <div id='matchmaking'>
      <h1>Matchmaking</h1>
      <GameSelection username={props.username} playerId={props.playerId} />
    </div>
  )
}
