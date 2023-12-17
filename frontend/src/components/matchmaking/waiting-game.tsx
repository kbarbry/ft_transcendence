import React from 'react'
import { QueueStatus } from './queue-status'

import { OnDataOptions, useSubscription } from '@apollo/client'
import { matchmakingNotification } from './graphql'
import {
  EGameType,
  MatchmakingNotificationSubscription,
  MatchmakingNotificationSubscriptionVariables
} from '../../gql/graphql'

type Props = {
  username: string
  playerId: string
  gameType: EGameType
  setGameId: (id: string | null) => void
}

export const WaitingGame: React.FC<Props> = (props: Props) => {
  function listenMatchmaking(options: OnDataOptions<any>) {
    let res = options.data.data.matchmakingNotification
    props.setGameId(res)
  }

  const { loading, error } = useSubscription<
    MatchmakingNotificationSubscription,
    MatchmakingNotificationSubscriptionVariables
  >(matchmakingNotification, {
    variables: { playerId: props.playerId },
    onData: listenMatchmaking
  })

  if (error) {
    return <p>Unable to connect to matchmaking server.</p>
  }
  if (loading) {
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
}