import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserInformations } from './user-informations.slice'
import { client } from '../../main'
import { findAllRelationFriend, findUsersByUserIds } from '../graphql'

export interface FriendInformations {
  friends: UserInformations[] | null
}

const initialState: FriendInformations = {
  friends: null
}

export const setFriendInformations = createAsyncThunk(
  'friendInformations/fetchFriendInformations',
  async (userId: string) => {
    try {
      const { data: dataFriendsIds } = await client.query({
        query: findAllRelationFriend,
        variables: { findAllRelationFriendId: userId }
      })

      const userIds = dataFriendsIds.findAllRelationFriend
      const { data: dataFriends } = await client.query({
        query: findUsersByUserIds,
        variables: { userIds }
      })

      const friends: UserInformations[] = dataFriends.findUsersByUserIds
      return friends
    } catch (e) {
      console.log('ERROR: ', e)
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
      state.friends = action.payload
    })
  }
})

export default friendInformationsSlice.reducer
