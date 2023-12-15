import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'
import {
  DeleteChannelInvitedMutation,
  DeleteChannelInvitedMutationVariables,
  EMemberType
} from '../../gql/graphql'
import { mutationDeleteChannelInvited } from '../graphql'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'
import PopUpError from '../../ErrorPages/PopUpError'

interface ChannelInvitedProfileProps {
  channelsInfos: ChannelAndChannelMember[]
  channelId: string
  memberId: string
}

const ChannelInvitedProfile: React.FC<ChannelInvitedProfileProps> = ({
  channelsInfos,
  channelId,
  memberId
}) => {
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  if (!channelInfo) throw new Error('Invalid cancel invitation')

  const invitedUser = channelInfo.channelInviteds.find(
    (invited) => invited.id === memberId
  )

  const memberUser = channelInfo.channelMemberUser

  if (!invitedUser || !memberUser) throw new Error('Invalid cancel invitation')

  const [uninviteUser] = useMutation<
    DeleteChannelInvitedMutation,
    DeleteChannelInvitedMutationVariables
  >(mutationDeleteChannelInvited)

  const handleUninviteUser = async () => {
    try {
      await uninviteUser({
        variables: {
          channelId: channelInfo.channel.id,
          userId: invitedUser.id
        }
      })
    } catch (Error) {
      const error_message = (Error as Error).message
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  const adminAction = memberUser.type === EMemberType.Admin

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      {isError && <PopUpError message={errorMessage} />}

      <img
        src={invitedUser.avatarUrl || DefaultProfilePicture}
        alt={`Profile for ${invitedUser.username}`}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px',
          cursor: 'pointer'
        }}
      />
      <span>{invitedUser.username}</span>

      {adminAction && <button onClick={handleUninviteUser}>Uninvite</button>}
    </div>
  )
}

export default ChannelInvitedProfile
