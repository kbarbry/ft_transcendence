import React, { useState, useEffect } from 'react'
import { useAppDispatch } from './store/hooks'

import { setFriendInformations } from './store/slices/friend-informations.slice'
import { setRequestSentInformations } from './store/slices/request-sent-informations.slice'
import { setRequestReceivedInformations } from './store/slices/request-received-informations.slice'
import { setBlockedInformations } from './store/slices/blocked-informations.slice'
import { setChannelInformations } from './store/slices/channel-informations.slice'
import AppPrivateSplit from './AppPrivate.split'
import { setChannelInvitations } from './store/slices/channel-invitation-informations'
import AppPrivateLoading from './AppPrivate.loading'

interface LoadingStoreState {
  channels: boolean
  friends: boolean
  requestsSent: boolean
  requestsReceived: boolean
  blockeds: boolean
  invitations: boolean
  isError: boolean
}

interface AppPrivateStoreProps {
  userId: string
}

const LoadingStoreStateInitial: LoadingStoreState = {
  channels: true,
  friends: true,
  requestsSent: true,
  requestsReceived: true,
  blockeds: true,
  invitations: true,
  isError: false
}

const AppPrivateStore: React.FC<AppPrivateStoreProps> = ({ userId }) => {
  const dispatch = useAppDispatch()
  const [loadingStore, setLoadingStore] = useState<LoadingStoreState>(
    LoadingStoreStateInitial
  )

  const [initialValuesSet, setInitialValuesSet] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(setChannelInformations(userId))
        await dispatch(setFriendInformations(userId))
        await dispatch(setRequestSentInformations(userId))
        await dispatch(setRequestReceivedInformations(userId))
        await dispatch(setBlockedInformations(userId))
        await dispatch(setChannelInvitations(userId))
        await new Promise((resolve) => setTimeout(resolve, 100))

        if (!initialValuesSet) {
          setInitialValuesSet(true)

          setLoadingStore({
            channels: false,
            friends: false,
            requestsSent: false,
            requestsReceived: false,
            blockeds: false,
            invitations: false,
            isError: false
          })
        }
      } catch (e) {
        console.log('Error in AppPrivate.store.tsx: ', e)
        setLoadingStore((prevLoading) => ({ ...prevLoading, isError: true }))
        throw e
      }
    }

    fetchData()
  }, [dispatch, userId, initialValuesSet])

  useEffect(() => {
    if (initialValuesSet) {
      setLoadingStore((prevLoading) => ({ ...prevLoading }))
    }
  }, [])

  const allLoadingStoreComplete = Object.values(loadingStore).every(
    (load) => !load
  )

  if (loadingStore.isError) return <p>Error</p>

  if (!allLoadingStoreComplete)
    return (
      <AppPrivateLoading
        userInfos={true}
        storeInfos={true}
        subscriptions={true}
        key='LoadingStep1'
      />
    )

  if (!initialValuesSet) throw new Error()

  return <AppPrivateSplit userId={userId} key={userId} />
}

export default AppPrivateStore
