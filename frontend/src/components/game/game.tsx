import React from 'react'
import { Pong } from './Pong'
import { Matchmaking } from '../matchmaking/matchmaking'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setGameIdValue } from '../../store/slices/gameId.slice'

// NOTE pour update les infos en fin de partie :
// changer le lev en bdd
// dispatch(setUserInformations())

export const Game: React.FC = () => {
  const username: string | undefined = useAppSelector(
    (state) => state.userInformations.user?.username
  )
  const playerId: string | undefined = useAppSelector(
    (state) => state.userInformations.user?.id
  )
  const dispatch = useAppDispatch()
  let gameId: string | null = useAppSelector(
    (state) => state.gameIdInformation.gameId
  )

  console.log('Game: gameId = ' + gameId)

  function setGameId(id: string | null) {
    dispatch(setGameIdValue(id))
  }

  if (username === undefined || playerId === undefined) {
    return <p>Error : Username is not set.</p>
  }
  if (gameId !== null) {
    return <Pong gameId={gameId} username={username} playerId={playerId} />
  }
  return (
    <>
      <Matchmaking
        username={username}
        playerId={playerId}
        setGameId={setGameId}
      />
    </>
  )
}
