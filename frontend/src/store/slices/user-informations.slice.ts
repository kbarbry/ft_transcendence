import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../main'
import { findUserByContext } from '../graphql'
import {
  FindOneChannelByNameQueryVariables,
  FindOneUserByContextQuery,
  User
} from '../../gql/graphql'
import { validateAvatarUrl } from '../utils'

interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null
}

export const setUserInformations = createAsyncThunk(
  'userInformations/fetchUserInformations',
  async () => {
    try {
      const { data: dataUser } = await client.query<
        FindOneUserByContextQuery,
        FindOneChannelByNameQueryVariables
      >({
        query: findUserByContext,
        fetchPolicy: 'network-only'
      })

      let user = dataUser.findOneUserByContext

      user = { ...user, avatarUrl: await validateAvatarUrl(user.avatarUrl) }
      return user
    } catch (e) {
      console.log('Error in setUserInformations: ', e)
      throw e
    }
  }
)

export const userInformationsSlice = createSlice({
  name: 'userInformations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUserInformations.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload
      }
    })
  }
})

export default userInformationsSlice.reducer
