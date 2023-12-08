import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../main'
import { findAllRelationRequestsReceived, findUsersByUserIds } from '../graphql'
import {
  FindAllRelationRequestsReceivedQuery,
  FindUsersByUserIdsQuery,
  User
} from '../../gql/graphql'
import { validateAvatarUrl } from '../utils'

export interface RequestReceivedInformations {
  requestReceived: User[] | null
}

const initialState: RequestReceivedInformations = {
  requestReceived: null
}

export const setRequestReceivedInformations = createAsyncThunk(
  'requestReceivedInformations/fetchRequestReceivedInformations',
  async (userId: string) => {
    try {
      const { data: dataRequestsIds } =
        await client.query<FindAllRelationRequestsReceivedQuery>({
          query: findAllRelationRequestsReceived,
          variables: { userReceiverId: userId },
          fetchPolicy: 'network-only'
        })

      const userIds = dataRequestsIds.findAllRelationRequestsReceived
      const { data: dataRequests } =
        await client.query<FindUsersByUserIdsQuery>({
          query: findUsersByUserIds,
          variables: { userIds }
        })

      const requestReceived = dataRequests.findUsersByUserIds

      const requestVerified = await Promise.all(
        requestReceived.map(async (user) => {
          return (user = {
            ...user,
            avatarUrl: await validateAvatarUrl(user.avatarUrl)
          })
        })
      )

      return requestVerified
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
