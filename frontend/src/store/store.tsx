import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userInformationsReducer from './slices/user-informations.slice'
import friendInformationsReducer from './slices/friend-informations.slice'
import requestSentInformationsReducer from './slices/request-sent-informations.slice'
import requestReceivedInformationsReducer from './slices/request-received-informations.slice'
import blockedInformationsReducer from './slices/blocked-informations.slice'
import channelInformationsReducer from './slices/channel-informations.slice'
import gameIdInformationReducer from './slices/gameId.slice'
import gameInvitationInformationReducer from './slices/gameInvitations.slice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  userInformations: userInformationsReducer,
  channelInformations: channelInformationsReducer,
  friendInformations: friendInformationsReducer,
  blockedInformations: blockedInformationsReducer,
  requestSentInformations: requestSentInformationsReducer,
  requestReceivedInformations: requestReceivedInformationsReducer,
  gameIdInformation: gameIdInformationReducer,
  gameInvitationsInformation: gameInvitationInformationReducer
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
