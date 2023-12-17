import React, { useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  EGameType,
  IsGameValidQuery,
  IsGameValidQueryVariables,
  SendPongInvitationMutation,
  SendPongInvitationMutationVariables,
  User
} from '../../gql/graphql'
import { gameInvitationMutation } from './graphql'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setGameIdValue } from '../../store/slices/gameId.slice'
import { Button, Flex } from 'antd'
import { isGameValid } from '../game/graphql'

type Props = {
  targetPlayerUsername: string
}
export const GameInvitationButton: React.FC<Props> = (props: Props) => {
  const user: User | null = useAppSelector(
    (state) => state.userInformations.user
  )
  const gameId: string | null = useAppSelector(
    (state) => state.gameIdInformation.gameId
  )
  if (user === null) {
    return null
  }

  const dispatch = useAppDispatch()

  const {
    data: queryData,
    loading: queryLoading,
    error: querryError
  } = useQuery<IsGameValidQuery, IsGameValidQueryVariables>(isGameValid, {
    skip: gameId === null,
    variables: { gameId: gameId!, userId: user.id },
    fetchPolicy: 'cache-and-network'
  })

  const [invite, { data: mutationData, error }] = useMutation<
    SendPongInvitationMutation,
    SendPongInvitationMutationVariables
  >(gameInvitationMutation)

  useEffect(() => {
    if (mutationData?.sendPongInvitation) {
      console.log('invitationButton: setGameId')
      dispatch(setGameIdValue(mutationData.sendPongInvitation))
    }
  })

  if (queryLoading) {
    return (
      <div className='game-invitation'>
        <p>Invitation :</p>
        <p>Loading</p>
      </div>
    )
  }
  if (error || querryError) {
    return (
      <div className='game-invitation'>
        <p>Invitation :</p>
        <p>An error occured during invitation</p>
      </div>
    )
  }
  if (queryData && queryData.isGameValid === true) {
    return null
  }
  if (mutationData && mutationData.sendPongInvitation === null) {
    return (
      <div className='game-invitation'>
        <p>Invitation :</p>
        <p>Unable to invite</p>
      </div>
    )
  }
  return (
    <div className='game-invitation'>
      <Flex gap='small' align='center' justify='flex-start'>
        <p>Invitation :</p>
        <Button
          className='classic-game'
          onClick={() => {
            invite({
              variables: {
                gameType: EGameType.Classic,
                receiverNickname: props.targetPlayerUsername,
                senderId: user.id,
                senderNickname: user.username
              }
            })
          }}
        >
          Classic
        </Button>
        <Button
          className='special-game'
          onClick={() => {
            invite({
              variables: {
                gameType: EGameType.Special,
                receiverNickname: props.targetPlayerUsername,
                senderId: user.id,
                senderNickname: user.username
              }
            })
          }}
        >
          Special
        </Button>
      </Flex>
    </div>
  )
}
