import React, { useState } from 'react'
import { Pong } from '../game/Pong'
import { Matchmaking } from '../matchmaking/matchmaking'

// NOTE pour update les infos en fin de partie :
// changer le lev en bdd
// dispatch(setUserInformations())

export const Game: React.FC = () => {
  const [username, setUsername] = useState('')
  const [gameId, setGameId] = useState<string | null>(null)

  console.log('Game: gameId = ' + gameId)
  function quitGame() {
    setGameId(null)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
    console.log('handleChange')
    event.preventDefault()
  }

  if (gameId !== null) {
    return <Pong quitHandler={quitGame} gameId={gameId} username={username} />
  }
  return (
    <>
      <Matchmaking
        username={username}
        handleChange={handleChange}
        setGameId={setGameId}
      />
    </>
  )
}
