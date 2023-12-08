import React, { useState, useEffect } from 'react'
import './App.css'

import { useAuth } from './auth/AuthContext'
import useLocation from 'wouter/use-location'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { setUserInformations } from './store/slices/user-informations.slice'
import AppPrivateStore from './AppPrivate.store'

interface LoadingStoreState {
  user: boolean
  isError: boolean
}

const LoadingStoreStateInitial: LoadingStoreState = {
  user: true,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setUserInformations())
        if (user && user.id) {
          setLoadingStore((prevLoading) => ({ ...prevLoading, user: false }))
        }
      } catch (e) {
        console.log('Error in AppPrivate.subscription.tsx: ', e)
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

  return <> {user && <AppPrivateStore userId={user.id} />}</>
}

export default App_private
