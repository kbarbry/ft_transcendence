import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../main'
import { findUserByContext } from '../graphql'
import { ELanguage, EStatus } from '../../gql/graphql'

export const PROFILE_PICTURE_URL =
  'http://127.0.0.1:5173/DefaultProfilePicture.svg'

export interface UserInformations {
  id: string
  avatarUrl?: string
  mail: string
  username: string
  status: EStatus
  languages: ELanguage
  level: number
}

interface UserState {
  user: UserInformations | null
}

const initialState: UserState = {
  user: null
}

export const setUserInformations = createAsyncThunk(
  'userInformations/fetchUserInformations',
  async () => {
    try {
      const { data: dataUser } = await client.query({
        query: findUserByContext,
        fetchPolicy: 'network-only'
      })

      const user: UserInformations = dataUser.findOneUserByContext

      let avatarUrl = user.avatarUrl || PROFILE_PICTURE_URL
      try {
        const response = await fetch(avatarUrl)
        const contentType = response.headers.get('Content-Type')

        if (!response.ok || (contentType && !contentType.startsWith('image/')))
          avatarUrl = PROFILE_PICTURE_URL
      } catch (e) {
        avatarUrl = PROFILE_PICTURE_URL
      }

      return {
        id: user.id,
        mail: user.mail,
        username: user.username,
        status: user.status,
        languages: user.languages,
        level: user.level,
        avatarUrl
      }
    } catch (e) {
      console.log('error setUserInformations: ', e)
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
