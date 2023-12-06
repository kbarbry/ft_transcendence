import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserInformations } from './user-informations.slice'
import { client } from '../../main'
import { findAllRelationRequestsReceived, findUsersByUserIds } from '../graphql'

export interface RequestReceivedInformations {
  requestReceived: UserInformations[] | null
}

const initialState: RequestReceivedInformations = {
  requestReceived: null
}

export const setRequestReceivedInformations = createAsyncThunk(
  'requestReceivedInformations/fetchRequestReceivedInformations',
  async (userId: string) => {
    try {
      const { data: dataRequestsIds } = await client.query({
        query: findAllRelationRequestsReceived,
        variables: { userReceiverId: userId },
        fetchPolicy: 'network-only'
      })

      const userIds = dataRequestsIds.findAllRelationRequestsReceived
      const { data: dataRequests } = await client.query({
        query: findUsersByUserIds,
        variables: { userIds }
      })

      const requestReceived: UserInformations[] =
        dataRequests.findUsersByUserIds
      return requestReceived
    } catch (e) {
      console.log('Error requestsReceived slice: ', e)
      throw e
    }
  }
)

export const requestReceivedInformationsSlice = createSlice({
  name: 'requestInformations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      setRequestReceivedInformations.fulfilled,
      (state, action) => {
        return {
          ...state,
          requestReceived: action.payload
        }
      }
    )
  }
})

export default requestReceivedInformationsSlice.reducer
