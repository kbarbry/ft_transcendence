import React from 'react'
import { SubMatchmaking } from './subMatchmaking'
import { QueueStatus } from './queue-status'

type Props = {
  username: string
  setGameId: React.Dispatch<React.SetStateAction<string | null>>
}

export const WaitingGame: React.FC<Props> = (props: Props) => {
  return (
    <>
      <SubMatchmaking username={props.username} setGameId={props.setGameId} />
      <h1>Waiting Game</h1>
      <QueueStatus username={props.username} setGameId={props.setGameId} />
    </>
  )
}
