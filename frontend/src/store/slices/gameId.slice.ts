import { createSlice } from '@reduxjs/toolkit'

interface GameIdState {
  gameId: string | null
}

const initialState = { gameId: null } as GameIdState

const gameIdSlice = createSlice({
  name: 'gameIdInformation',
  initialState,
  reducers: {
    setGameIdValue(state, actions) {
      state.gameId = actions.payload
    },
    unsetGameIdValue(state) {
      state.gameId = null
    }
  }
})

export const { setGameIdValue, unsetGameIdValue } = gameIdSlice.actions
export default gameIdSlice.reducer
