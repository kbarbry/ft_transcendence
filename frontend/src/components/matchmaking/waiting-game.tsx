import { OnDataOptions, useMutation, useSubscription } from '@apollo/client'
import React, { useEffect } from 'react'
import { addPlayerToMatchmakingQueue, matchmakingNotification } from './graphql'

type Props = {
  username: string
  setGameId: React.Dispatch<React.SetStateAction<string>>
  gameType: (type: string) => void
}

export const WaitingGame: React.FC<Props> = (props: Props) => {
  console.log('WaitingGame: username = ' + props.username)

  const playerId = props.username + '1234'
  //subscribe to game
  //send matchmaking mutation
  //return waiting time

  function listenMatchmaking(options: OnDataOptions<any>) {
    let res = options.data.data.matchmakingNotification
    console.log('matchNotif = ' + res)
    props.setGameId(res)
  }

  useSubscription(matchmakingNotification, {
    variables: { playerId: props.username },
    onData: listenMatchmaking
  })

  //sendmutation joinQueue
  const [addPlayerToMatchmaking] = useMutation(addPlayerToMatchmakingQueue)

  const addPlayer = async () => {
    console.log('WaitingGame: pre addPlayer: ')

    try {
      const { data } = await addPlayerToMatchmaking({
        variables: { nickname: props.username, playerId }
      })
      console.log('WaitingGame: post addPlayer: ' + JSON.stringify(data))
    } catch (e) {
      console.log('Error in Waiting Game block: ', e)
      throw e
    }
  }

  useEffect(() => {
    console.log('WaitingGame: useEffect:')
    addPlayer()
  }, [])

  return (
    <>
      <h1>Waiting Game</h1>
    </>
  )
}
