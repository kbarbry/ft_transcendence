import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserInformations } from './user-informations.slice'
import { client } from '../../main'
import { findAllRelationBlocked, findUsersByUserIds } from '../graphql'

export interface BlockedInformations {
  blockeds: UserInformations[] | null
}

const initialState: BlockedInformations = {
  blockeds: null
}

export const setBlockedInformations = createAsyncThunk(
  'blockedInformations/fetchBlockedInformations',
  async (userId: string) => {
    try {
      const { data: dataBlockedsIds } = await client.query({
        query: findAllRelationBlocked,
        variables: { findAllRelationBlockedByUserId: userId }
      })

      const userIds = dataBlockedsIds.findAllRelationBlockedByUser

      const { data: dataBlockeds } = await client.query({
        query: findUsersByUserIds,
        variables: { userIds }
      })

      const blockeds: UserInformations[] = dataBlockeds.findUsersByUserIds
      return blockeds
    } catch (e) {
      console.log('ERROR: ', e)
      throw e
    }
  }
)

export const blockedInformationsSlice = createSlice({
  name: 'blockedInformations',
  initialState,
  reducers: {},
  // Reducers can't be asynchronous, so we connect an asynchronous function to an extraReducer to make it work
  extraReducers: (builder) => {
    builder.addCase(setBlockedInformations.fulfilled, (state, action) => {
      state.blockeds = action.payload
    })
  }
})

export default blockedInformationsSlice.reducer
