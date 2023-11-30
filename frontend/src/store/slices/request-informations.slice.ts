import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserInformations } from './user-informations.slice'
import { client } from '../../main'
import { findAllRelationRequest, findUsersByUserIds } from '../graphql'

export interface RequestInformations {
  requests: UserInformations[] | null
}

const initialState: RequestInformations = {
  requests: null
}

export const setRequestInformations = createAsyncThunk(
  'requestInformations/fetchRequestInformations',
  async (userId: string) => {
    try {
      const { data: dataRequestsIds } = await client.query({
        query: findAllRelationRequest,
        variables: { userSenderId: userId }
      })

      const userIds = dataRequestsIds.findAllRelationRequestsSent
      const { data: dataRequests } = await client.query({
        query: findUsersByUserIds,
        variables: { userIds }
      })

      const requests: UserInformations[] = dataRequests.findUsersByUserIds
      return requests
    } catch (e) {
      console.log('ERROR: ', e)
      throw e
    }
  }
)

export const requestInformationsSlice = createSlice({
  name: 'requestInformations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setRequestInformations.fulfilled, (state, action) => {
      state.requests = action.payload
    })
  }
})

export default requestInformationsSlice.reducer
