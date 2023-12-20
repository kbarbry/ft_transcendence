import { createSlice } from '@reduxjs/toolkit'
import { EGameType } from '../../gql/graphql'

export type GameInvitationState = {
  gameType: EGameType
  gameId: string
  senderUsername: string
}

const initialArrayState: Array<GameInvitationState> =
  new Array<GameInvitationState>()

const gameInvitationSlice = createSlice({
  name: 'gameInvitationInformation',
  initialState: initialArrayState,
  reducers: {
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
      state.splice(0, state.length)
    }
  }
})

export const {
  addGameInvitationValue,
  removeOneInvitationValue,
  clearInvitations
} = gameInvitationSlice.actions
export default gameInvitationSlice.reducer
