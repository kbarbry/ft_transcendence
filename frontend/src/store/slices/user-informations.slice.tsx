import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  avatarUrl: string
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

// Every new data you wanna save need a new slice
// Every new slice need to be referenced in the store.tsx by their reducer
export const userInformationsSlice = createSlice({
  name: 'userInformations',
  initialState,
  // reducers are the list of functions to EDIT the data
  reducers: {
    // We need to use PayloadAction<type> because all reducers will be called with a dispatch function (see in home.tsx) that is meant to call a dispatch(action)
    setUserInformations: (state, action: PayloadAction<UserInformations>) => {
      state.user = action.payload
    }
  }
})

// Must export both
export const { setUserInformations } = userInformationsSlice.actions
// For this one the import is userInformationSliceReducer (can't be found automatically by IDE)
export default userInformationsSlice.reducer
