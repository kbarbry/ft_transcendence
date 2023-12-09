import { OnDataOptions, useSubscription } from '@apollo/client'
import React from 'react'
import { matchmakingNotification } from './graphql'

type Props = {
  username: string
  setGameId: React.Dispatch<React.SetStateAction<string | null>>
}

export const SubMatchmaking: React.FC<Props> = (props: Props) => {
  function listenMatchmaking(options: OnDataOptions<any>) {
    let res = options.data.data.matchmakingNotification
    props.setGameId(res)
  }

  useSubscription(matchmakingNotification, {
    variables: { playerId: props.username },
    onData: listenMatchmaking
  })

  return null
}
