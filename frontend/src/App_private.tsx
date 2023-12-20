import React, { useState, useEffect } from 'react'

import { useAuth } from './auth/AuthContext'
import useLocation from 'wouter/use-location'
import { useAppDispatch } from './store/hooks'
import { setUserInformations } from './store/slices/user-informations.slice'
import AppPrivateStore from './AppPrivate.store'
import { User } from './gql/graphql'
import AppPrivateLoading from './AppPrivate.loading'

interface LoadingStoreState {
  user: string | null
  isError: boolean
}

const LoadingStoreStateInitial: LoadingStoreState = {
  user: null,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(setUserInformations())
        const user = res.payload as User

        if (user && user.id) {
          setLoadingStore((prevLoading) => ({ ...prevLoading, user: user.id }))
        }
      } catch (e) {
        console.log('Error in AppPrivate.subscription.tsx: ', e)
        setLoadingStore((prevLoading) => ({ ...prevLoading, isError: true }))
        throw e
      }
    }

    fetchData()
  }, [])

  if (loadingStore.isError) return <p>Error</p>

  if (!loadingStore.user)
    return (
      <AppPrivateLoading
        userInfos={false}
        storeInfos={false}
        subscriptions={false}
        key='LoadingStep1'
      />
    )

  return (
    <>
      <AppPrivateStore userId={loadingStore.user} key={loadingStore.user} />
    </>
  )
}

export default App_private
