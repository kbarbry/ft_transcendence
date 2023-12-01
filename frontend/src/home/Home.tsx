import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setUserInformations } from '../store/slices/user-informations.slice'
import { setFriendInformations } from '../store/slices/friend-informations.slice'
import { setRequestInformations } from '../store/slices/request-informations.slice'
import { setBlockedInformations } from '../store/slices/blocked-informations.slice'

interface LoadingState {
  user: boolean
  friends: boolean
  requests: boolean
  blockeds: boolean
  isError: boolean
}

const LoadingStateInitial: LoadingState = {
  user: true,
  friends: true,
  requests: true,
  blockeds: true,
  isError: false
}

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userInformations.user)
  const friends = useAppSelector((state) => state.friendInformations.friends)
  const requests = useAppSelector((state) => state.requestInformations.requests)
  const blockeds = useAppSelector((state) => state.blockedInformations.blockeds)
  const [loading, setLoading] = useState<LoadingState>(LoadingStateInitial)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setUserInformations())
        if (user && user.id) {
          setLoading((prevLoading) => ({ ...prevLoading, user: false }))
          await dispatch(setFriendInformations(user.id))
          await dispatch(setRequestInformations(user.id))
          await dispatch(setBlockedInformations(user.id))

          if (friends)
            setLoading((prevLoading) => ({ ...prevLoading, friends: false }))
          if (requests)
            setLoading((prevLoading) => ({ ...prevLoading, requests: false }))
          if (blockeds)
            setLoading((prevLoading) => ({ ...prevLoading, blockeds: false }))
        }
      } catch (e) {
        console.log('Home.tsx error: ', e)
        setLoading((prevLoading) => ({ ...prevLoading, isError: true }))
        throw e
      }
    }
    fetchData()
  }, [dispatch, user])

  const allLoadingComplete = Object.values(loading).every((load) => !load)

  if (!allLoadingComplete) return <p>Loading... {JSON.stringify(loading)}</p>
  if (loading.isError) return <p>Error</p>

  return (
    <>
      <div>Bonjour bonjour sur le home</div>
    </>
  )
}
