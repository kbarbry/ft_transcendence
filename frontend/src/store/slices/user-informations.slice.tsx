import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../main'
import { findUserByContext } from '../graphql'

const PROFILE_PICTURE_URL = 'http://127.0.0.1:5173/DefaultProfilePicture.svg'

// All enums MUST be perfectly equal to the ones in the backend
export enum EStatus {
  Online = 'Online',
  Invisble = 'Invisble',
  Idle = 'Idle',
  DoNotDisturb = 'DoNotDisturb'
}

export enum ELanguage {
  English = 'English',
  French = 'French',
  Spanish = 'Spanish'
}

export interface UserInformations {
  id: string
  avatarUrl?: string
  mail: string
  username: string
  status: EStatus
  languages: ELanguage
  level: number
  validation2fa: boolean
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
        query: findUserByContext
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
        validation2fa: user.validation2fa,
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
      state.user = { ...action.payload }
    })
  }
})

export default userInformationsSlice.reducer
