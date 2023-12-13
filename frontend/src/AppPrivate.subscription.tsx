import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { useAppDispatch } from './store/hooks'
import {
  subscriptionOnBlockedReceived,
  subscriptionOnChannelBlockedCreation,
  subscriptionOnChannelBlockedDeletion,
  subscriptionOnChannelEdition,
  subscriptionOnChannelInvitedCreation,
  subscriptionOnChannelMemberCreation,
  subscriptionOnChannelMemberDeletion,
  subscriptionOnChannelMemberEdition,
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
import {
  ChannelBlockedCreationSubscription,
  ChannelBlockedCreationSubscriptionVariables,
  ChannelBlockedDeletionSubscription,
  ChannelBlockedDeletionSubscriptionVariables,
  ChannelDeletionSubscription,
  ChannelDeletionSubscriptionVariables,
  ChannelEditionSubscription,
  ChannelEditionSubscriptionVariables,
  ChannelInvitedCreationSubscription,
  ChannelInvitedCreationSubscriptionVariables,
  ChannelInvitedDeletionSubscription,
  ChannelInvitedDeletionSubscriptionVariables,
  ChannelMemberCreationSubscription,
  ChannelMemberCreationSubscriptionVariables,
  ChannelMemberDeletionSubscription,
  ChannelMemberDeletionSubscriptionVariables,
  ChannelMemberEditionSubscription,
  ChannelMemberEditionSubscriptionVariables,
  RelationBlockedCreationSubscription,
  RelationBlockedCreationSubscriptionVariables,
  RelationFriendDeletedSubscription,
  RelationFriendDeletedSubscriptionVariables,
  RelationRequestCreationSubscription,
  RelationRequestCreationSubscriptionVariables,
  RelationRequestDeletedSubscription,
  RelationRequestDeletedSubscriptionVariables
} from './gql/graphql'
import {
  setChannelBlockedsInformations,
  setChannelChannelInformations,
  setChannelInvitedsInformations,
  setChannelMembersInformations
} from './store/slices/channel-informations.slice'
import { ProfilPage } from './userInfo/ProfilPage'
import UpdateProfil from './userInfo/UpdateProfilForm'

interface AppPrivateSubscriptionProps {
  userId: string
}

export interface LoadingSubscriptionState {
  channelEdited: boolean
  channelDeleted: boolean
  channelMemberCreated: boolean
  channelMemberEdited: boolean
  channelMemberDeleted: boolean
  channelInvitedCreated: boolean
  channelInvitedDeleted: boolean
  channelBlockedCreated: boolean
  channelBlockedDeleted: boolean
  blockedReceived: boolean
  friendDeleted: boolean
  requestCreated: boolean
  requestDeleted: boolean
  isError: boolean
}

const LoadingSubscriptionStateInitial: LoadingSubscriptionState = {
  channelEdited: true,
  channelDeleted: true,
  channelMemberCreated: true,
  channelMemberEdited: true,
  channelMemberDeleted: true,
  channelInvitedCreated: true,
  channelInvitedDeleted: true,
  channelBlockedCreated: true,
  channelBlockedDeleted: true,
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

  //**************************************************//
  //  RELATIONS
  //**************************************************//
  const { error: subFriendDeleted } = useSubscription<
    RelationFriendDeletedSubscription,
    RelationFriendDeletedSubscriptionVariables
  >(subscriptionOnFriendDeleted, {
    variables: { userId },
    onData: async (received) => {
      if (received.data.data?.relationFriendDeleted) {
        await dispatch(setFriendInformations(userId))
      }
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
  })

  const { error: subRequestCreated } = useSubscription<
    RelationRequestCreationSubscription,
    RelationRequestCreationSubscriptionVariables
  >(subscriptionOnRequestCreated, {
    variables: { userId },
    onData: async (received) => {
      if (received.data.data?.relationRequestCreation) {
        await dispatch(setFriendInformations(userId))
        await dispatch(setRequestSentInformations(userId))
        await dispatch(setRequestReceivedInformations(userId))
      }
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
  })

  const { error: subRequestDeleted } = useSubscription<
    RelationRequestDeletedSubscription,
    RelationRequestDeletedSubscriptionVariables
  >(subscriptionOnRequestDeleted, {
    variables: { userId },
    onData: async (received) => {
      if (received.data.data?.relationRequestDeleted) {
        await dispatch(setRequestReceivedInformations(userId))
      }
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
  })

  const { error: subBlockedReceived } = useSubscription<
    RelationBlockedCreationSubscription,
    RelationBlockedCreationSubscriptionVariables
  >(subscriptionOnBlockedReceived, {
    variables: { userId },
    onData: async (received) => {
      if (received.data.data?.relationBlockedCreation) {
        await dispatch(setFriendInformations(userId))
        await dispatch(setRequestSentInformations(userId))
        await dispatch(setRequestReceivedInformations(userId))
      }
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
  })

  //**************************************************//
  //  CHANNELS
  //**************************************************//
  const { error: errorChannelEditions } = useSubscription<
    ChannelEditionSubscription,
    ChannelEditionSubscriptionVariables
  >(subscriptionOnChannelEdition, {
    variables: { channelEditionId: userId },
    onData: async (received) => {
      console.log('ChannelEdition')
      if (received.data.data?.channelEdition) {
        const res = received.data.data?.channelEdition
        await dispatch(setChannelChannelInformations(res.id))
      }
    }
  })

  const { error: errorChannelDeletions } = useSubscription<
    ChannelDeletionSubscription,
    ChannelDeletionSubscriptionVariables
  >(subscriptionOnChannelEdition, {
    variables: { channelDeletionId: userId },
    onData: async (received) => {
      console.log('ChannelDeleted')
      if (received.data.data?.channelDeletion) {
        const res = received.data.data?.channelDeletion
        await dispatch(setChannelChannelInformations(res.id))
      }
    }
  })

  const { error: errorChannelMemberCreation } = useSubscription<
    ChannelMemberCreationSubscription,
    ChannelMemberCreationSubscriptionVariables
  >(subscriptionOnChannelMemberCreation, {
    variables: { channelMemberCreationId: userId },
    onData: async (received) => {
      console.log('ChannelMemberCreation')
      if (received.data.data?.channelMemberCreation) {
        const res = received.data.data?.channelMemberCreation
        await dispatch(setChannelMembersInformations(res.channelId))
      }
    }
  })

  const { error: errorChannelMemberEdition } = useSubscription<
    ChannelMemberEditionSubscription,
    ChannelMemberEditionSubscriptionVariables
  >(subscriptionOnChannelMemberEdition, {
    variables: { channelMemberEditionId: userId },
    onData: async (received) => {
      console.log('ChannelMemberEdition')
      if (received.data.data?.channelMemberEdition) {
        const res = received.data.data?.channelMemberEdition
        await dispatch(setChannelMembersInformations(res.channelId))
      }
    }
  })

  const { error: errorChannelMemberDeletion } = useSubscription<
    ChannelMemberDeletionSubscription,
    ChannelMemberDeletionSubscriptionVariables
  >(subscriptionOnChannelMemberDeletion, {
    variables: { channelMemberDeletionId: userId },
    onData: async (received) => {
      console.log('ChannelMemberDeletion')
      if (received.data.data?.channelMemberDeletion) {
        const res = received.data.data?.channelMemberDeletion
        await dispatch(setChannelMembersInformations(res.channelId))
      }
    }
  })

  const { error: errorChannelInvitedCreation } = useSubscription<
    ChannelInvitedCreationSubscription,
    ChannelInvitedCreationSubscriptionVariables
  >(subscriptionOnChannelInvitedCreation, {
    variables: { channelInvitedCreationId: userId },
    onData: async (received) => {
      console.log('ChannelInvitedCreation')
      if (received.data.data?.channelInvitedCreation) {
        const res = received.data.data?.channelInvitedCreation
        await dispatch(setChannelInvitedsInformations(res.channelId))
      }
    }
  })

  const { error: errorChannelInvitedDeletion } = useSubscription<
    ChannelInvitedDeletionSubscription,
    ChannelInvitedDeletionSubscriptionVariables
  >(subscriptionOnChannelEdition, {
    variables: { channelInvitedDeletionId: userId },
    onData: async (received) => {
      console.log('ChannelInvitedDeletion')
      if (received.data.data?.channelInvitedDeletion) {
        const res = received.data.data?.channelInvitedDeletion
        await dispatch(setChannelInvitedsInformations(res.channelId))
      }
    }
  })

  const { error: errorChannelBlockedCreation } = useSubscription<
    ChannelBlockedCreationSubscription,
    ChannelBlockedCreationSubscriptionVariables
  >(subscriptionOnChannelBlockedCreation, {
    variables: { channelBlockedCreationId: userId },
    onData: async (received) => {
      console.log('ChannelBlockedCreation')
      if (received.data.data?.channelBlockedCreation) {
        const res = received.data.data?.channelBlockedCreation
        await dispatch(setChannelBlockedsInformations(res.channelId))
      }
    }
  })

  const { error: errorChannelBlockedDeletion } = useSubscription<
    ChannelBlockedDeletionSubscription,
    ChannelBlockedDeletionSubscriptionVariables
  >(subscriptionOnChannelBlockedDeletion, {
    variables: { channelBlockedDeletionId: userId },
    onData: async (received) => {
      console.log('ChannelBlockedDeltion')
      if (received.data.data?.channelBlockedDeletion) {
        const res = received.data.data?.channelBlockedDeletion
        await dispatch(setChannelBlockedsInformations(res.channelId))
      }
    }
  })

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
    if (!errorChannelEditions)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        channelEdited: false
      }))
    if (!errorChannelDeletions)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        channelDeleted: false
      }))
    if (!errorChannelMemberCreation)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        channelMemberCreated: false
      }))
    if (!errorChannelMemberEdition)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        channelMemberEdited: false
      }))
    if (!errorChannelMemberDeletion)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        channelMemberDeleted: false
      }))
    if (!errorChannelInvitedCreation)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        channelInvitedCreated: false
      }))
    if (!errorChannelInvitedDeletion)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        channelInvitedDeleted: false
      }))
    if (!errorChannelBlockedCreation)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        channelBlockedCreated: false
      }))
    if (!errorChannelBlockedDeletion)
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        channelBlockedDeleted: false
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
    return (
      <>
        <p>Loading... {JSON.stringify(loadingSubscription)}</p>
      </>
    )
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
      <br />
      <Link href='/profilPage'>
        <a>User Page</a>
      </Link>
      <br />
      <br />
      <Link href='/'>
        <a>WelcomePage</a>
      </Link>
      <br />
      <br />
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
        <Route path='/profilPage' component={ProfilPage} />
        <Route path='/updateProfil' component={UpdateProfil} />

        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default AppPrivateSubscription
