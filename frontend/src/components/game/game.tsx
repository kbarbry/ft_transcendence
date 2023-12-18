import React from 'react'
import { Pong } from './Pong'
import { Matchmaking } from '../matchmaking/matchmaking'
import { useAppSelector } from '../../store/hooks'
import { useQuery } from '@apollo/client'
import {
  IsGameValidQuery,
  IsGameValidQueryVariables,
  User
} from '../../gql/graphql'
import { isGameValid } from './graphql'

export const Game: React.FC = () => {
  const user: User | null = useAppSelector(
    (state) => state.userInformations.user
  )
  let gameId: string | null = useAppSelector(
    (state) => state.gameIdInformation.gameId
  )

  const { data, loading, error } = useQuery<
    IsGameValidQuery,
    IsGameValidQueryVariables
  >(isGameValid, {
    skip: gameId === null || user === null,
    variables: { gameId: gameId!, userId: user?.id! },
    fetchPolicy: 'cache-and-network'
  })

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
      <Matchmaking username={user.username} playerId={user.id} />
    </>
  )
}
