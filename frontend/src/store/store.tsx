import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userInformationsReducer from './slices/user-informations.slice'
import friendInformationsReducer from './slices/friend-informations.slice'
import requestInformationsReducer from './slices/request-informations.slice'
import blockedInformationsReducer from './slices/blocked-informations.slice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

// This store will store all the different slices, no need to make another one
const rootReducer = combineReducers({
  userInformations: userInformationsReducer,
  friendInformations: friendInformationsReducer,
  requestInformations: requestInformationsReducer,
  blockedInformations: blockedInformationsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
