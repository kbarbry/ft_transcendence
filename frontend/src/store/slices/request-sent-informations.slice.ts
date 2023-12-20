import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../main'
import { findAllRelationRequestsSent, findUsersByUserIds } from '../graphql'
import {
  FindAllRelationRequestsSentQuery,
  FindAllRelationRequestsSentQueryVariables,
  FindUsersByUserIdsQuery,
  FindUsersByUserIdsQueryVariables,
  User
} from '../../gql/graphql'
import { validateAvatarUrl } from '../utils'

export interface RequestSentInformations {
  requestSent: User[] | null
}

const initialState: RequestSentInformations = {
  requestSent: null
}

export const setRequestSentInformations = createAsyncThunk(
  'requestSentInformations/fetchRequestSentInformations',
  async (userId: string) => {
    try {
      const { data: dataRequestsIds } = await client.query<
        FindAllRelationRequestsSentQuery,
        FindAllRelationRequestsSentQueryVariables
      >({
        query: findAllRelationRequestsSent,
        variables: { userSenderId: userId },
        fetchPolicy: 'network-only'
      })

      const userIds = dataRequestsIds.findAllRelationRequestsSent
      const { data: dataRequests } = await client.query<
        FindUsersByUserIdsQuery,
        FindUsersByUserIdsQueryVariables
      >({
        query: findUsersByUserIds,
        variables: { userIds }
      })

      const requestSent = dataRequests.findUsersByUserIds

      const requestVerified = await Promise.all(
        requestSent.map(async (user) => {
          return (user = {
            ...user,
            avatarUrl: await validateAvatarUrl(user.avatarUrl)
          })
        })
      )

      return requestVerified
    } catch (e) {
      console.log('Error requestsSent slice: ', e)
      throw e
    }
  }
)

export const requestSentInformationsSlice = createSlice({
  name: 'requestSentInformations',
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
