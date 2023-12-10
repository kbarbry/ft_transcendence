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
  function listenPongData(options: OnDataOptions<any>) {
    let data = options.data.data.pongData as PongGame
    props.updateGameElement(data)
  }

  useSubscription<PongDataSubscription, PongDataSubscriptionVariables>(
    pongDataSubscription,
    {
      variables: { gameId: props.gameId },
      onData: listenPongData,
      onError: (error) => {
        props.setGameError(error)
      }
    }
  )

  return null
}
