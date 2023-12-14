import React from 'react'
import { ApolloError, OnDataOptions, useSubscription } from '@apollo/client'
import { pongDataSubscription } from './graphql'
import {
  PongDataSubscription,
  PongDataSubscriptionVariables,
  PongGame
} from '../../gql/graphql'

type Props = {
  gameId: string
  updateGameElement: (pongData: PongGame) => void
  setGameError: (error: ApolloError) => void
}

export const SubPong: React.FC<Props> = (props: Props) => {
  function listenPongData(options: OnDataOptions<PongDataSubscription>) {
    if (options.data.data === undefined) {
      return
    }
    let pongGameInfo: PongGame = options.data.data.pongData
    props.updateGameElement(pongGameInfo)
  }

  useSubscription<PongDataSubscription, PongDataSubscriptionVariables>(
    pongDataSubscription,
    {
      variables: { gameId: props.gameId },
      onData: listenPongData,
      onError: (error) => {
        console.log('subPongError : ' + JSON.stringify(error, undefined, 2))
        props.setGameError(error)
      }
    }
  )

  return null
}
