import React, { useState, useEffect } from 'react'
import './App.css'

import { useAuth } from './auth/AuthContext'
import useLocation from 'wouter/use-location'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setUserInformations } from './store/slices/user-informations.slice'
import { setFriendInformations } from './store/slices/friend-informations.slice'
import { setRequestSentInformations } from './store/slices/request-sent-informations.slice'
import { setRequestReceivedInformations } from './store/slices/request-received-informations.slice'
import { setBlockedInformations } from './store/slices/blocked-informations.slice'
import AppPrivateSubscription from './AppPrivate.subscription'

interface LoadingStoreState {
  user: boolean
  friends: boolean
  requestsSent: boolean
  requestsReceived: boolean
  blockeds: boolean
  isError: boolean
}

const LoadingStoreStateInitial: LoadingStoreState = {
  user: true,
  friends: true,
  requestsSent: true,
  requestsReceived: true,
  blockeds: true,
  isError: false
}

const App_private: React.FC = () => {
  const authenticated = useAuth()
  const [, setLocation] = useLocation()

  if (!authenticated) {
    setLocation('/forbidden', { replace: true })
  }

  const dispatch = useAppDispatch()
  const [loadingStore, setLoadingStore] = useState<LoadingStoreState>(
    LoadingStoreStateInitial
  )

  const user = useAppSelector((state) => state.userInformations.user)
  const friends = useAppSelector((state) => state.friendInformations.friends)
  const requestsSent = useAppSelector(
    (state) => state.requestSentInformations.requestSent
  )
  const requestsReceived = useAppSelector(
    (state) => state.requestReceivedInformations.requestReceived
  )
  const blockeds = useAppSelector((state) => state.blockedInformations.blockeds)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setUserInformations())
        if (user && user.id) {
          setLoadingStore((prevLoading) => ({ ...prevLoading, user: false }))
          await dispatch(setFriendInformations(user.id))
          await dispatch(setRequestSentInformations(user.id))
          await dispatch(setRequestReceivedInformations(user.id))
          await dispatch(setBlockedInformations(user.id))

          if (friends)
            setLoadingStore((prevLoading) => ({
              ...prevLoading,
              friends: false
            }))
          if (requestsSent)
            setLoadingStore((prevLoading) => ({
              ...prevLoading,
              requestsSent: false
            }))
          if (requestsReceived)
            setLoadingStore((prevLoading) => ({
              ...prevLoading,
              requestsReceived: false
            }))
          if (blockeds)
            setLoadingStore((prevLoading) => ({
              ...prevLoading,
              blockeds: false
            }))
        }
      } catch (e) {
        console.log('Home.tsx error: ', e)
        setLoadingStore((prevLoading) => ({ ...prevLoading, isError: true }))
        throw e
      }
    }
    fetchData()
  }, [user])

  const allLoadingStoreComplete = Object.values(loadingStore).every(
    (load) => !load
  )

  if (!allLoadingStoreComplete)
    return <p>Loading... {JSON.stringify(loadingStore)}</p>
  if (loadingStore.isError) return <p>Error</p>

  return <> {user && <AppPrivateSubscription userId={user?.id} />}</>
}

export default App_private
