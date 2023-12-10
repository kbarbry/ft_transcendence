import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'

import { setFriendInformations } from './store/slices/friend-informations.slice'
import { setRequestSentInformations } from './store/slices/request-sent-informations.slice'
import { setRequestReceivedInformations } from './store/slices/request-received-informations.slice'
import { setBlockedInformations } from './store/slices/blocked-informations.slice'
import AppPrivateSubscription from './AppPrivate.subscription'
import { setChannelInformations } from './store/slices/channel-informations.slice'

interface LoadingStoreState {
  channels: boolean
  friends: boolean
  requestsSent: boolean
  requestsReceived: boolean
  blockeds: boolean
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
  isError: false
}

const AppPrivateStore: React.FC<AppPrivateStoreProps> = ({ userId }) => {
  const dispatch = useAppDispatch()
  const [loadingStore, setLoadingStore] = useState<LoadingStoreState>(
    LoadingStoreStateInitial
  )
  const channels = useAppSelector(
    (state) => state.channelInformations.channelsInfos
  )
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
        await dispatch(setChannelInformations(userId))
        await dispatch(setFriendInformations(userId))
        await dispatch(setRequestSentInformations(userId))
        await dispatch(setRequestReceivedInformations(userId))
        await dispatch(setBlockedInformations(userId))

        if (channels)
          setLoadingStore((prevLoading) => ({
            ...prevLoading,
            channels: false
          }))

        if (friends)
          setLoadingStore((prevLoading) => ({
            ...prevLoading,
            friends: false
          }))
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
      } catch (e) {
        console.log('Error in AppPrivate.store.tsx: ', e)
        setLoadingStore((prevLoading) => ({ ...prevLoading, isError: true }))
        throw e
      }
    }

    fetchData()
  }, [])

  const allLoadingStoreComplete = Object.values(loadingStore).every(
    (load) => !load
  )

  if (!allLoadingStoreComplete)
    return <p>Loading... {JSON.stringify(loadingStore)}</p>
  if (loadingStore.isError) return <p>Error</p>

  if (!channels) throw new Error()

  return <AppPrivateSubscription userId={userId} key={userId} />
}

export default AppPrivateStore
