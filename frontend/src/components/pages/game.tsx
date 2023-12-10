import React, { useState } from 'react'
import { Pong } from '../game/Pong'
import { Matchmaking } from '../matchmaking/matchmaking'
import { useAppSelector } from '../../store/hooks'

// NOTE pour update les infos en fin de partie :
// changer le lev en bdd
// dispatch(setUserInformations())

export const Game: React.FC = () => {
  const username: string | undefined = useAppSelector(
    (state) => state.userInformations.user?.username
  )

  if (username === undefined) {
    return <p>Error : Username is not set.</p>
  }

  const [gameId, setGameId] = useState<string | null>(null) //TODO use store instead

  console.log('Game: gameId = ' + gameId)
  function quitGame() {
    setGameId(null)
  }

  if (gameId !== null) {
    return <Pong quitHandler={quitGame} gameId={gameId} username={username} />
  }
  return (
    <>
      <Matchmaking username={username} setGameId={setGameId} />
    </>
  )
}
