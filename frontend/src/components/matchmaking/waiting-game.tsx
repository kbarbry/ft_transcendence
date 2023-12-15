import React from 'react'
import { QueueStatus } from './queue-status'
import { EGameType } from '../../gql/graphql'

type Props = {
  username: string
  playerId: string
  gameType: EGameType
  setGameId: (id: string | null) => void
}

export const WaitingGame: React.FC<Props> = (props: Props) => {
  return (
    <>
      <h1>Queue for {props.gameType} game</h1>
      <QueueStatus
        username={props.username}
        playerId={props.playerId}
        gameType={props.gameType}
        setGameId={props.setGameId}
      />
    </>
  )
}
