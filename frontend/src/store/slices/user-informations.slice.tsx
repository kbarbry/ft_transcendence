import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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
}

// A good norm when storing object is to do it with an interface | null
interface UserState {
  user: UserInformations | null
}

// This way the initialState can be null and not filled with non correct data
const initialState: UserState = {
  user: null
}

// In case of asynchronous Update data
export const setUserAvatar = createAsyncThunk(
  'userInformations/fetchUserAvatar',
  async (avatarUrl: string | undefined) => {
    if (!avatarUrl) {
      avatarUrl = PROFILE_PICTURE_URL
    } else {
      try {
        const response = await fetch(avatarUrl)
        const contentType = response.headers.get('Content-Type')

        if (response.ok) {
          if (contentType && !contentType.startsWith('image/')) {
            avatarUrl = PROFILE_PICTURE_URL
          }
        } else {
          avatarUrl = PROFILE_PICTURE_URL
        }
      } catch (e) {
        avatarUrl = PROFILE_PICTURE_URL
      }
    }
    return avatarUrl
  }
)

// Every new data you wanna save need a new slice
// Every new slice need to be referenced in the store.tsx by their reducer
export const userInformationsSlice = createSlice({
  name: 'userInformations',
  initialState,
  // reducers are the list of functions to EDIT the data
  reducers: {
    // We need to use PayloadAction<type> because all reducers will be called with a dispatch function (see in home.tsx) that is meant to call a dispatch(action)
    setUserInformations: (
      state,
      action: PayloadAction<Omit<UserInformations, 'avatarUrl'>>
    ) => {
      state.user = { ...action.payload }
    }
  },
  // Reducers can't be asynchronous, so we connect an asynchronous function to an extraReducer to make it work
  extraReducers: (builder) => {
    builder.addCase(setUserAvatar.fulfilled, (state, action) => {
      if (state.user) state.user = { ...state.user, avatarUrl: action.payload }
    })
  }
})

// Must export both
export const { setUserInformations } = userInformationsSlice.actions
// For this one the import is userInformationSliceReducer (can't be found automatically by IDE)
export default userInformationsSlice.reducer
