import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { useAppDispatch } from './store/hooks'
import {
  subscriptionOnBlockedReceived,
  subscriptionOnChannelBlockedCreation,
  subscriptionOnChannelBlockedDeletion,
  subscriptionOnChannelDeletion,
  subscriptionOnChannelEdition,
  subscriptionOnChannelInvitedCreation,
  subscriptionOnChannelInvitedDeletion,
  subscriptionOnChannelMemberCreation,
  subscriptionOnChannelMemberDeletion,
  subscriptionOnChannelMemberEdition,
  subscriptionOnFriendDeleted,
  subscriptionOnRequestCreated,
  subscriptionOnRequestDeleted
} from './graphql'

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
  removeChannelInfo,
  setChannelBlockedsInformations,
  setChannelChannelInformations,
  setChannelInformations,
  setChannelInvitedsInformations,
  setChannelMembersInformations
} from './store/slices/channel-informations.slice'
import {
  removeChannelInvitation,
  setChannelInvitations
} from './store/slices/channel-invitation-informations'
import AppPrivateLoading from './AppPrivate.loading'

interface AppPrivateSubscriptionProps {
  userId: string
  setSubscriptionsDone: React.Dispatch<
    React.SetStateAction<{ done: boolean; error: boolean }>
  >
}

interface LoadingSubscriptionState {
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
  userId,
  setSubscriptionsDone
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
    },
    onError: (e) => {
      console.log(
        'Error in AppPrivate.subscription.tsx subscriptionOnChannelEdition : ',
        e
      )
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        isError: true
      }))
    }
  })

  const { error: errorChannelDeletions } = useSubscription<
    ChannelDeletionSubscription,
    ChannelDeletionSubscriptionVariables
  >(subscriptionOnChannelDeletion, {
    variables: { channelDeletionId: userId },
    onData: async (received) => {
      console.log('ChannelDeleted')
      if (received.data.data?.channelDeletion) {
        const res = received.data.data?.channelDeletion
        await dispatch(removeChannelInfo(res.id))
      }
    },
    onError: (e) => {
      console.log(
        'Error in AppPrivate.subscription.tsx subscriptionOnChannelDeletion : ',
        e
      )
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        isError: true
      }))
    }
  })

  const { error: errorChannelMemberCreation } = useSubscription<
    ChannelMemberCreationSubscription,
    ChannelMemberCreationSubscriptionVariables
  >(subscriptionOnChannelMemberCreation, {
    variables: { channelMemberCreationId: userId },
    onData: async (received) => {
      console.log('ChannelMemberCreation HERE')
      if (received.data.data?.channelMemberCreation) {
        const res = received.data.data?.channelMemberCreation
        await dispatch(setChannelMembersInformations(res.channelId))
        await dispatch(setChannelInvitations(res.channelId))
        await dispatch(setChannelInvitedsInformations(res.channelId))
        await dispatch(setChannelInformations(userId))
      }
    },
    onError: (e) => {
      console.log(
        'Error in AppPrivate.subscription.tsx subscriptionOnChannelMemberCreation : ',
        e
      )
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        isError: true
      }))
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
    },
    onError: (e) => {
      console.log(
        'Error in AppPrivate.subscription.tsx subscriptionOnChannelMemberEdition : ',
        e
      )
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        isError: true
      }))
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
        if (res.userId === userId)
          await dispatch(removeChannelInfo(res.channelId))
        await dispatch(setChannelMembersInformations(res.channelId))
      }
    },
    onError: (e) => {
      console.log(
        'Error in AppPrivate.subscription.tsx subscriptionOnChannelMemberDeletion : ',
        e
      )
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        isError: true
      }))
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
        await dispatch(setChannelInvitations(userId))
      }
    },
    onError: (e) => {
      console.log(
        'Error in AppPrivate.subscription.tsx subscriptionOnChannelInvitedCreation : ',
        e
      )
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        isError: true
      }))
    }
  })

  const { error: errorChannelInvitedDeletion } = useSubscription<
    ChannelInvitedDeletionSubscription,
    ChannelInvitedDeletionSubscriptionVariables
  >(subscriptionOnChannelInvitedDeletion, {
    variables: { channelInvitedDeletionId: userId },
    onData: async (received) => {
      console.log('ChannelInvitedDeletion')
      if (received.data.data?.channelInvitedDeletion) {
        const res = received.data.data?.channelInvitedDeletion
        await dispatch(setChannelInvitedsInformations(res.channelId))
        if (res.userId === userId)
          await dispatch(removeChannelInvitation(res.channelId))
        else await dispatch(setChannelInvitations(userId))
      }
    },
    onError: (e) => {
      console.log(
        'Error in AppPrivate.subscription.tsx subscriptionOnChannelInvitedDeletion : ',
        e
      )
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        isError: true
      }))
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
        const res = received.data.data.channelBlockedCreation
        if (res.userId === userId) {
          await dispatch(removeChannelInfo(res.channelId))
        } else {
          await dispatch(setChannelBlockedsInformations(res.channelId))
          await dispatch(setChannelInvitedsInformations(res.channelId))
          await dispatch(setChannelMembersInformations(res.channelId))
        }
      }
    },
    onError: (e) => {
      console.log(
        'Error in AppPrivate.subscription.tsx subscriptionOnChannelBlockedCreation : ',
        e
      )
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        isError: true
      }))
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
    },
    onError: (e) => {
      console.log(
        'Error in AppPrivate.subscription.tsx subscriptionOnChannelBlockedDeletion : ',
        e
      )
      setLoadingSubscription((prevLoading) => ({
        ...prevLoading,
        isError: true
      }))
    }
  })

  const allLoadingSubscriptionComplete = Object.values(
    loadingSubscription
  ).every((load) => !load)

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

    if (allLoadingSubscriptionComplete)
      setSubscriptionsDone({ done: true, error: false })
    if (loadingSubscription.isError)
      setSubscriptionsDone({ done: false, error: true })
  }, [allLoadingSubscriptionComplete])

  if (!allLoadingSubscriptionComplete)
    return (
      <AppPrivateLoading
        userInfos={true}
        storeInfos={true}
        subscriptions={true}
        key='LoadingStep1'
      />
    )

  return <></>
}

export default AppPrivateSubscription
