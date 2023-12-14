import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../main'
import { findAllRelationFriend, findUsersByUserIds } from '../graphql'
import {
  FindAllRelationFriendQuery,
  FindUsersByUserIdsQuery,
  User
} from '../../gql/graphql'
import { validateAvatarUrl } from '../utils'

export interface FriendInformations {
  friends: User[] | null
}

const initialState: FriendInformations = {
  friends: null
}

export const setFriendInformations = createAsyncThunk(
  'friendInformations/fetchFriendInformations',
  async (userId: string) => {
    try {
      const { data: dataFriendsIds } =
        await client.query<FindAllRelationFriendQuery>({
          query: findAllRelationFriend,
          variables: { findAllRelationFriendId: userId },
          fetchPolicy: 'network-only'
        })

      const userIds = dataFriendsIds.findAllRelationFriend

      const { data: dataFriends } = await client.query<FindUsersByUserIdsQuery>(
        {
          query: findUsersByUserIds,
          variables: { userIds }
        }
      )
      const friends = dataFriends.findUsersByUserIds

      const requestVerified = await Promise.all(
        friends.map(async (user) => {
          return (user = {
            ...user,
            avatarUrl: await validateAvatarUrl(user.avatarUrl)
          })
        })
      )

      return requestVerified
    } catch (e) {
      console.log('Error friends slice: ', e)
      throw e
    }
  }
)

export const friendInformationsSlice = createSlice({
  name: 'friendInformations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setFriendInformations.fulfilled, (state, action) => {
      return {
        ...state,
        friends: action.payload
      }
    })
  }
})

export default friendInformationsSlice.reducer
