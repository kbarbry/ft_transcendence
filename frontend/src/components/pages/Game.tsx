import React, { useState } from 'react'
import { Pong } from '../game/Pong'
import { Matchmaking } from '../matchmaking/Matchmaking'

// NOTE
// changer le lev en bdd
// dispatch(setUserInformations())

export const Game: React.FC = () => {
  const [username, setUsername] = useState('') //TODO useState<String | null>('')
  const [gameId, setGameId] = useState('')

  console.log('Game: gameId = ' + gameId)
  function quitGame() {
    setGameId('')
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
    console.log('handleChange')
    event.preventDefault()
  }

  if (gameId !== '') {
    //replace matched by game id
    return <Pong quitHandler={quitGame} />
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
