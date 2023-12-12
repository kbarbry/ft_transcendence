import React, { useState } from 'react'
import { WaitingGame } from './waiting-game'
import { GameSelection } from './game-selection'

type Props = {
  username: string
  playerId: string
  setGameId: (id: string | null) => void
}

export const Matchmaking: React.FC<Props> = (props) => {
  const [gameType, setGameType] = useState<String | null>(null)

  console.log('Matchmaking: gameType = ' + gameType)
  if (gameType === null) {
    return (
      <>
        <GameSelection username={props.username} setGameType={setGameType} />
      </>
    )
  }
  return (
    <WaitingGame
      username={props.username}
      playerId={props.playerId}
      setGameId={props.setGameId}
    />
  )
}
