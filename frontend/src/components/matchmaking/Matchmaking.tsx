import React, { useState } from 'react'
import { WaitingGame } from './waiting-game'
import { GameSelection } from './username-form'

type Props = {
  username: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setGameId: React.Dispatch<React.SetStateAction<string | null>>
}

export const Matchmaking: React.FC<Props> = (props) => {
  const [gameType, setGameType] = useState('')

  function gameClassic() {
    console.log('gameClassic')
    setGameType('Classic')
  }

  function gameExtra() {
    setGameType('Extra')
  }

  console.log('Matchmaking: gameType = ' + gameType)
  if (gameType !== '') {
    return (
      <>
        <WaitingGame username={props.username} setGameId={props.setGameId} />
      </>
    )
  }
  return (
    <>
      <GameSelection
        username={props.username}
        handleChange={props.handleChange}
        gameClassic={gameClassic}
        gameExtra={gameExtra}
      />
    </>
  )
}
