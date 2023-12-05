import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'

import Relations from './relations/Relations'
import Channels from './chat/Channels'
import PrivateChannel from './chat/PrivateChannels'
import { Welcome } from './Test/Test_welcome'
import { Game } from './Test/Test_game'
import { Link, Route, Switch } from 'wouter'
import { Home } from './home/Home'
import { NotFound } from './ErrorPages/404'
import { subscriptionOnBlockedReceived } from './graphql'

interface AppPrivateSubscriptionProps {
  userId: string
}

interface LoadingSubscriptionState {
  blockedReceived: boolean
  isError: boolean
}

const LoadingSubscriptionStateInitial: LoadingSubscriptionState = {
  blockedReceived: true,
  isError: false
}

const AppPrivateSubscription: React.FC<AppPrivateSubscriptionProps> = ({
  userId
}) => {
  const [loadingSubscription, setLoadingSubscription] =
    useState<LoadingSubscriptionState>(LoadingSubscriptionStateInitial)

  const { error: subBlockedReceived } = useSubscription(
    subscriptionOnBlockedReceived,
    {
      variables: { userId },
      onData: (received) => {
        const receivedMessage = received.data.data.relationBlockedCreation

        console.log(receivedMessage)
      },
      onError: () => {
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
  }, [subBlockedReceived])

  const allLoadingSubscriptionComplete = Object.values(
    loadingSubscription
  ).every((load) => !load)

  const handleLogout = async () => {
    try {
      window.location.href = 'http://127.0.0.1:3000/api/auth/logout'
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('userInfo')
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error)
    }
  }

  if (!allLoadingSubscriptionComplete)
    return <p>Loading... {JSON.stringify(loadingSubscription)}</p>
  if (loadingSubscription.isError) return <p>Error</p>

  return (
    <>
      <h2>Private APP</h2>

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
