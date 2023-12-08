import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserInformations } from './user-informations.slice'
import { client } from '../../main'
import { findAllRelationRequestsSent, findUsersByUserIds } from '../graphql'

export interface RequestSentInformations {
  requestSent: UserInformations[] | null
}

const initialState: RequestSentInformations = {
  requestSent: null
}

export const setRequestSentInformations = createAsyncThunk(
  'requestSentInformations/fetchRequestSentInformations',
  async (userId: string) => {
    try {
      const { data: dataRequestsIds } = await client.query({
        query: findAllRelationRequestsSent,
        variables: { userSenderId: userId },
        fetchPolicy: 'network-only'
      })

      const userIds = dataRequestsIds.findAllRelationRequestsSent
      const { data: dataRequests } = await client.query({
        query: findUsersByUserIds,
        variables: { userIds }
      })

      const requestSent: UserInformations[] = dataRequests.findUsersByUserIds
      return requestSent
    } catch (e) {
      console.log('Error requestsSent slice: ', e)
      throw e
    }
  }
)

export const requestSentInformationsSlice = createSlice({
  name: 'requestInformations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setRequestSentInformations.fulfilled, (state, action) => {
      return {
        ...state,
        requestSent: action.payload
      }
    })
  }
})

export default requestSentInformationsSlice.reducer
