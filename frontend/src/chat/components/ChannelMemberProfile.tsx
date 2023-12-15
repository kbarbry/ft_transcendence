import React, { useState } from 'react'
import {
  CreateChannelBlockedMutation,
  CreateChannelBlockedMutationVariables,
  DeleteChannelMemberMutation,
  DeleteChannelMemberMutationVariables,
  EMemberType,
  MuteChannelMemberMutation,
  MuteChannelMemberMutationVariables,
  UnmuteChannelMemberMutation,
  UnmuteChannelMemberMutationVariables
} from '../../gql/graphql'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'
import { useMutation } from '@apollo/client'
import {
  mutationCreateChannelBlocked,
  mutationDeleteChannelMember,
  mutationMuteChannelMember,
  mutationUnmuteChannelMember
} from '../graphql'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'
import PopUpError from '../../ErrorPages/PopUpError'

interface ChannelMemberProfileProps {
  channelsInfos: ChannelAndChannelMember[]
  channelId: string
  memberId: string
}

const ChannelMemberProfile: React.FC<ChannelMemberProfileProps> = ({
  channelsInfos,
  channelId,
  memberId
}) => {
  const [showProfileOverlay, setShowProfileOverlay] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )

  if (!channelInfo) throw new Error()

  const member = channelInfo.channelMembers.find(
    (channelMember) => channelMember.userId === memberId
  )

  const memberUser = channelInfo.channelMemberUser

  if (!member || !memberUser) throw new Error()

  const [kickMember] = useMutation<
    DeleteChannelMemberMutation,
    DeleteChannelMemberMutationVariables
  >(mutationDeleteChannelMember)

  const [muteMember] = useMutation<
    MuteChannelMemberMutation,
    MuteChannelMemberMutationVariables
  >(mutationMuteChannelMember)

  const [unmuteMember] = useMutation<
    UnmuteChannelMemberMutation,
    UnmuteChannelMemberMutationVariables
  >(mutationUnmuteChannelMember)

  const [banMember] = useMutation<
    CreateChannelBlockedMutation,
    CreateChannelBlockedMutationVariables
  >(mutationCreateChannelBlocked)

  const handleViewProfile = () => {
    setShowProfileOverlay(true)
  }

  const handleCloseOverlay = () => {
    setShowProfileOverlay(false)
  }

  const handleKickMember = async () => {
    try {
      await kickMember({
        variables: {
          userId: member.userId,
          channelId: member.channelId
        }
      })
      handleCloseOverlay()
    } catch (Error) {
      const error_message = 'Cannot kick this user'
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  const handleMuteUnmuteMember = async () => {
    try {
      if (member.muted) {
        await unmuteMember({
          variables: {
            userId: member.userId,
            channelId: member.channelId
          }
        })
      } else {
        await muteMember({
          variables: {
            userId: member.userId,
            channelId: member.channelId
          }
        })
      }
    } catch (Error) {
      const error_message = 'Cannot mute/unmute this user'
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  const handleBanMember = async () => {
    try {
      await banMember({
        variables: {
          data: {
            userId: member.userId,
            channelId: member.channelId
          }
        }
      })
      handleCloseOverlay()
    } catch (Error) {
      const error_message = 'Cannot ban this user'
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  const overlayMouseDownHandler = () => {
    handleCloseOverlay()
  }

  const contentDivClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const adminAction =
    member.type === EMemberType.Member && memberUser.type === EMemberType.Admin
  const ownerAction =
    channelInfo.channel.ownerId === memberUser.userId &&
    member.userId !== memberUser.userId

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      {isError && <PopUpError message={errorMessage} />}
      <img
        src={member?.avatarUrl ? member.avatarUrl : DefaultProfilePicture}
        alt={`Profile for ${member.nickname}`}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px',
          cursor: 'pointer'
        }}
        onClick={handleViewProfile}
      />
      <span>{member.nickname}</span>

      <button onClick={handleViewProfile}>View Profile</button>

      {(adminAction || ownerAction) && member.muted && (
        <button onClick={handleMuteUnmuteMember}>Unmute</button>
      )}

      {(adminAction || ownerAction) && !member.muted && (
        <button onClick={handleMuteUnmuteMember}>Mute</button>
      )}

      {(adminAction || ownerAction) && (
        <button onClick={handleKickMember}>Kick Member</button>
      )}

      {(adminAction || ownerAction) && (
        <button onClick={handleBanMember}>Ban Member</button>
      )}

      {showProfileOverlay && (
        <div
          onMouseDown={overlayMouseDownHandler}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            onMouseDown={contentDivClickHandler}
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            <img
              src={member.avatarUrl || DefaultProfilePicture}
              alt={`Profile for ${member.nickname}`}
              style={{ width: '80px', height: '80px', borderRadius: '50%' }}
            />
            <p>{member.nickname}</p>
            <button onClick={handleCloseOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChannelMemberProfile
