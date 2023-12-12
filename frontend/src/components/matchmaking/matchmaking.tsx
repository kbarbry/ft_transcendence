import React, { useState } from 'react'
import { WaitingGame } from './waiting-game'
import { GameSelection } from './game-selection'
import { EGameType } from '../../gql/graphql'

type Props = {
  username: string
  playerId: string
  setGameId: (id: string | null) => void
}

export const Matchmaking: React.FC<Props> = (props) => {
  const [gameType, setGameType] = useState<EGameType | null>(null)

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
      gameType={gameType}
      setGameId={props.setGameId}
    />
  )
}
