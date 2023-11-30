import { configureStore } from '@reduxjs/toolkit'
import userInformationsReducer from './slices/user-informations.slice'
import friendInformationsReducer from './slices/friend-informations.slice'
import requestInformationsReducer from './slices/request-informations.slice'
import blockedInformationsReducer from './slices/blocked-informations.slice'

// This store will store all the different slices, no need to make another one
export const store = configureStore({
  reducer: {
    userInformations: userInformationsReducer,
    friendInformations: friendInformationsReducer,
    requestInformations: requestInformationsReducer,
    blockedInformations: blockedInformationsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
