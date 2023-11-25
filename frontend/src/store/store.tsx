import { configureStore } from '@reduxjs/toolkit'
import userInformationsReducer from './slices/user-informations.slice'

// This store will store all the different slices, no need to make another one
export const store = configureStore({
  reducer: {
    userInformations: userInformationsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
