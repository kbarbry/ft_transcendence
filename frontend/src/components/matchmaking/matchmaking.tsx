import React, { useState } from 'react'
import { WaitingGame } from './waiting-game'
import { GameSelection } from './game-selection'
import {
  EGameType,
  IsUserInGameQueueQuery,
  IsUserInGameQueueQueryVariables
} from '../../gql/graphql'
import { useQuery } from '@apollo/client'
import { isPlayerQueued } from './graphql'

type Props = {
  username: string
  playerId: string
  setGameId: (id: string | null) => void
}

export const Matchmaking: React.FC<Props> = (props) => {
  const [gameType, setGameType] = useState<EGameType | null>(null)
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError
  } = useQuery<IsUserInGameQueueQuery, IsUserInGameQueueQueryVariables>(
    isPlayerQueued,
    { variables: { userId: props.playerId }, fetchPolicy: 'cache-and-network' }
  )

  console.log('Matchmaking: gameType = ' + gameType)
  if (queryError) {
    return <p>Unable to connect to server.</p>
  }
  if (queryLoading) {
    return <p>Loading...</p>
  }
  if (queryData && queryData.isUserInGameQueue === true) {
    return <p>You already join game queue</p>
  }
  if (gameType === null) {
    return (
      <>
        <GameSelection
          username={props.username}
          playerId={props.playerId}
          setGameType={setGameType}
        />
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
