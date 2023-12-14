import { createSlice } from '@reduxjs/toolkit'
import {
  EGameType,
  IsGameValidQuery,
  IsGameValidQueryVariables
} from '../../gql/graphql'
import { client } from '../../main'
import { isGameValid } from '../graphql'

type GameInvitationState = {
  gameType: EGameType
  gameId: string
  senderUsername: string
}

const initialArrayState: Array<GameInvitationState> =
  new Array<GameInvitationState>()

async function checkGameExistence(gameId: string, userId: string) {
  const { data } = await client.query<
    //TODO refresh probleme here
    IsGameValidQuery,
    IsGameValidQueryVariables
  >({
    query: isGameValid,
    variables: { gameId, userId }
  })
  if (data.isGameValid) {
    return true
  }
  return false
}

const gameInvitationSlice = createSlice({
  name: 'gameInvitationInformation',
  initialState: initialArrayState,
  reducers: {
    updateGameInvitations(state, actions) {
      state = state.filter((invitation) => {
        if (invitation.gameId === null) {
          return false
        }
        return checkGameExistence(invitation.gameId, actions.payload)
      })
    },
    addGameInvitationValue(state, actions) {
      const gameInvitation: GameInvitationState = {
        gameId: actions.payload.gameId,
        gameType: actions.payload.gameType,
        senderUsername: actions.payload.senderNickname
      }
      state.push(gameInvitation)
    },
    removeOneInvitationValue(state, actions) {
      const index: number = state.findIndex((invitation) => {
        return invitation.gameId === actions.payload
      })
      state.splice(index, 1)
    },
    clearInvitations(state) {
      state = new Array<GameInvitationState>()
    }
  }
})

export const {
  updateGameInvitations,
  addGameInvitationValue,
  removeOneInvitationValue,
  clearInvitations
} = gameInvitationSlice.actions
export default gameInvitationSlice.reducer
