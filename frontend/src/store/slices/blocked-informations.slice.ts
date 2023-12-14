import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../main'
import { findAllRelationBlocked, findUsersByUserIds } from '../graphql'
import {
  FindAllRelationBlockedQuery,
  FindAllRelationBlockedQueryVariables,
  FindUsersByUserIdsQuery,
  FindUsersByUserIdsQueryVariables,
  User
} from '../../gql/graphql'
import { validateAvatarUrl } from '../utils'

export interface BlockedInformations {
  blockeds: User[] | null
}

const initialState: BlockedInformations = {
  blockeds: null
}

export const setBlockedInformations = createAsyncThunk(
  'blockedInformations/fetchBlockedInformations',
  async (userId: string) => {
    try {
      const { data: dataBlockedsIds } = await client.query<
        FindAllRelationBlockedQuery,
        FindAllRelationBlockedQueryVariables
      >({
        query: findAllRelationBlocked,
        variables: { findAllRelationBlockedByUserId: userId },
        fetchPolicy: 'network-only'
      })

      const userIds = dataBlockedsIds.findAllRelationBlockedByUser

      const { data: dataBlockeds } = await client.query<
        FindUsersByUserIdsQuery,
        FindUsersByUserIdsQueryVariables
      >({
        query: findUsersByUserIds,
        variables: { userIds }
      })

      const blockeds = dataBlockeds.findUsersByUserIds

      const requestVerified = await Promise.all(
        blockeds.map(async (user) => {
          return (user = {
            ...user,
            avatarUrl: await validateAvatarUrl(user.avatarUrl)
          })
        })
      )

      return requestVerified
    } catch (e) {
      console.log('Error blockeds slice: ', e)
      throw e
    }
  }
)

export const blockedInformationsSlice = createSlice({
  name: 'blockedInformations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setBlockedInformations.fulfilled, (state, action) => {
      return {
        ...state,
        blockeds: action.payload
      }
    })
  }
})

export default blockedInformationsSlice.reducer
