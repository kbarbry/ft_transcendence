import { useSubscription } from '@apollo/client'
import React from 'react'
import { gameInvitationSubscription } from './graphql'
import {
  GameInvitation,
  PongInvitationSubcriptionSubscription,
  PongInvitationSubcriptionSubscriptionVariables
} from '../../gql/graphql'
import { useAppDispatch } from '../../store/hooks'
import { addGameInvitationValue } from '../../store/slices/gameInvitations.slice'

type Props = {
  nickname: string
}

export const GameInvitationSubscription: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()

  useSubscription<
    PongInvitationSubcriptionSubscription,
    PongInvitationSubcriptionSubscriptionVariables
  >(gameInvitationSubscription, {
    variables: { nickname: props.nickname },
    onData: (options) => {
      console.log(
        'Game invitation reveived : gameId =' +
          options.data.data?.pongInvitationSubcription.gameId
      )
      if (options.data.data === undefined) {
        return
      }
      const invitation: GameInvitation = {
        gameId: options.data.data.pongInvitationSubcription.gameId,
        gameType: options.data.data.pongInvitationSubcription.gameType,
        senderNickname:
          options.data.data.pongInvitationSubcription.senderNickname
      }
      dispatch(addGameInvitationValue(invitation))
    },
    onError: (error) => {
      //TODO handle it correctly
      console.log(
        'Error while receiving invitation : ' +
          JSON.stringify(error, undefined, 2)
      )
    }
  })
  return null
}
