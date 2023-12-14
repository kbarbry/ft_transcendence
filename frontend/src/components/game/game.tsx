import React from 'react'
import { Pong } from './Pong'
import { Matchmaking } from '../matchmaking/matchmaking'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setGameIdValue } from '../../store/slices/gameId.slice'
import { useQuery } from '@apollo/client'
import {
  IsGameValidQuery,
  IsGameValidQueryVariables,
  User
} from '../../gql/graphql'
import { isGameValid } from './graphql'

// NOTE pour update les infos en fin de partie :
// changer le lev en bdd
// dispatch(setUserInformations())

export const Game: React.FC = () => {
  const user: User | null = useAppSelector(
    (state) => state.userInformations.user
  )
  const dispatch = useAppDispatch()
  let gameId: string | null = useAppSelector(
    (state) => state.gameIdInformation.gameId
  )
  console.log('Game: gameId = ' + gameId)

  const { data, loading, error } = useQuery<
    IsGameValidQuery,
    IsGameValidQueryVariables
  >(isGameValid, {
    skip: gameId === null || user === null,
    variables: { gameId: gameId!, userId: user?.id! },
    fetchPolicy: 'cache-and-network'
  })

  function setGameId(id: string | null) {
    dispatch(setGameIdValue(id))
  }

  if (user === null || user?.id === undefined) {
    return <p>Error : Username is not set.</p>
  }
  if (gameId !== null && data && data.isGameValid === true) {
    return <Pong gameId={gameId} username={user.username} playerId={user.id} />
  }
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>An error occured while connecting to the server</p>
  }
  return (
    <>
      <Matchmaking
        username={user.username}
        playerId={user.id}
        setGameId={setGameId}
      />
    </>
  )
}
