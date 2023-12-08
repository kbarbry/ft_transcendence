import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { useAppDispatch } from './store/hooks'
import {
  subscriptionOnBlockedReceived,
  subscriptionOnFriendDeleted,
  subscriptionOnRequestCreated,
  subscriptionOnRequestDeleted
} from './graphql'

import PrivateChannel from './chat/PrivateChannels'
import Relations from './relations/Relations'
import Channels from './chat/Channels'
import { Welcome } from './Test/Test_welcome'
import { Link, Route, Switch } from 'wouter'
import { Settings } from './auth/2fa/settings'
import { NotFound } from './ErrorPages/404'
import { Game } from './Test/Test_game'
import { Home } from './home/Home'

import { setRequestReceivedInformations } from './store/slices/request-received-informations.slice'
import { setRequestSentInformations } from './store/slices/request-sent-informations.slice'
import { setFriendInformations } from './store/slices/friend-informations.slice'

interface AppPrivateSubscriptionProps {
  userId: string
}

interface LoadingSubscriptionState {
  blockedReceived: boolean
  friendDeleted: boolean
  requestCreated: boolean
  requestDeleted: boolean
  isError: boolean
}

const LoadingSubscriptionStateInitial: LoadingSubscriptionState = {
  blockedReceived: true,
  friendDeleted: true,
  requestCreated: true,
  requestDeleted: true,
  isError: false
}

const AppPrivateSubscription: React.FC<AppPrivateSubscriptionProps> = ({
  userId
}) => {
  const [loadingSubscription, setLoadingSubscription] =
    useState<LoadingSubscriptionState>(LoadingSubscriptionStateInitial)
  const dispatch = useAppDispatch()

  const { error: subBlockedReceived } = useSubscription(
    subscriptionOnBlockedReceived,
    {
      variables: { userId },
      onData: async (received) => {
        received.data.data.relationBlockedCreation
        await dispatch(setFriendInformations(userId))
        await dispatch(setRequestSentInformations(userId))
        await dispatch(setRequestReceivedInformations(userId))
      },
      onError: (e) => {
        console.log(
          'Error in AppPrivate.subscription.tsx subscriptionOnBlockedReceived : ',
          e
        )
        setLoadingSubscription((prevLoading) => ({
          ...prevLoading,
          isError: true
        }))
      }
    }
  )

  const { error: subFriendDeleted } = useSubscription(
    subscriptionOnFriendDeleted,
    {
      variables: { userId },
      onData: async (received) => {
        received.data.data.relationFriendDeleted
        await dispatch(setFriendInformations(userId))
      },
      onError: (e) => {
        console.log(
          'Error in AppPrivate.subscription.tsx subscriptionOnFriendDeleted : ',
          e
        )
        setLoadingSubscription((prevLoading) => ({
          ...prevLoading,
          isError: true
        }))
      }
    }
  )

  const { error: subRequestCreated } = useSubscription(
    subscriptionOnRequestCreated,
    {
      variables: { userId },
      onData: async (received) => {
        received.data.data.relationRequestCreation
        await dispatch(setFriendInformations(userId))
        await dispatch(setRequestSentInformations(userId))
        await dispatch(setRequestReceivedInformations(userId))
      },
      onError: (e) => {
        console.log(
          'Error in AppPrivate.subscription.tsx subscriptionOnRequestCreated : ',
          e
        )
        setLoadingSubscription((prevLoading) => ({
          ...prevLoading,
          isError: true
        }))
      }
    }
  )

  const { error: subRequestDeleted } = useSubscription(
    subscriptionOnRequestDeleted,
    {
      variables: { userId },
      onData: async (received) => {
        received.data.data.relationRequestDeleted
        await dispatch(setRequestReceivedInformations(userId))
      },
      onError: (e) => {
        console.log(
          'Error in AppPrivate.subscription.tsx subscriptionOnRequestDeleted : ',
          e
        )
        setLoadingSubscription((prevLoading) => ({
          ...prevLoading,
          isError: true
        }))
      }
    }
  )

  useEffect(() => {
    if (!subBlockedReceived)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        blockedReceived: false
      }))
    if (!subFriendDeleted)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        friendDeleted: false
      }))
    if (!subRequestCreated)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        requestCreated: false
      }))
    if (!subRequestDeleted)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        requestDeleted: false
      }))
  }, [])

  const allLoadingSubscriptionComplete = Object.values(
    loadingSubscription
  ).every((load) => !load)

  const handleLogout = async () => {
    try {
      window.location.href = 'http://127.0.0.1:3000/api/auth/logout'
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('userInfo')
    } catch (e) {
      console.error('Error in AppPrivate.subscription.tsx handleLogout : ', e)
      throw e
    }
  }

  if (!allLoadingSubscriptionComplete)
    return <p>Loading... {JSON.stringify(loadingSubscription)}</p>
  if (loadingSubscription.isError) return <p>Error</p>

  return (
    <>
      <h2>Private APP</h2>

      <Link href='/settings'>
        <a>Settings</a>
      </Link>
      <br />
      <Link href='/'>
        <a>Home</a>
      </Link>
      <br />
      <Link href='/privateChannel'>
        <a>Private Messages</a>
      </Link>
      <br />
      <Link href='/channel'>
        <a>Channels</a>
      </Link>
      <br />
      <Link href='/relations'>
        <a>Friends</a>
      </Link>
      <br />
      <Link href='/game'>
        <a>Game</a>
      </Link>
      <br />
      <br />
      <Link href='/'>
        <a>WelcomePage</a>
      </Link>
      <br />
      <button onClick={handleLogout}>Logout</button>

      <br></br>
      <br></br>
      <br></br>
      <Switch>
        <Route path='/settings' component={Settings} />
        <Route path='/privateChannel' component={PrivateChannel} />
        <Route path='/channel' component={Channels} />
        <Route path='/relations' component={Relations} />
        <Route path='/welcome' component={Welcome} />
        <Route path='/' component={Home} />
        <Route path='/game' component={Game} />

        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default AppPrivateSubscription
