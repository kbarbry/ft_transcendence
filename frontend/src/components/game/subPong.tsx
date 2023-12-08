import { OnDataOptions, useSubscription } from '@apollo/client'
import React from 'react'
import { pongDataSubscription } from './graphql'
import { PongGame } from '../../gql/graphql'

type Props = {
  gameId: string
  updateGameElement: (pongData: PongGame) => void
}

export const SubPong: React.FC<Props> = (props: Props) => {
  console.log('SubPong: props.gameId = ' + props.gameId)

  function listenPongData(options: OnDataOptions<any>) {
    let data = options.data.data.pongData as PongGame
    console.log('SubMatchmaking: listenPongData: onData()')
    props.updateGameElement(data)
  }

  useSubscription(pongDataSubscription, {
    variables: { gameId: props.gameId },
    onData: listenPongData,
    onError: (error) => {
      console.log('SubMatchmaking: onError: error = ' + JSON.stringify(error))
    }
  })

  return null
}
