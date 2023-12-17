import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'
import {
  DeleteChannelBlockedMutation,
  DeleteChannelBlockedMutationVariables,
  EMemberType
} from '../../gql/graphql'
import { mutationDeleteChannelBlocked } from '../graphql'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'
import PopUpError from '../../ErrorPages/PopUpError'

interface ChannelBlockedProfileProps {
  channelsInfos: ChannelAndChannelMember[]
  channelId: string
  memberId: string
}

const ChannelBlockedProfile: React.FC<ChannelBlockedProfileProps> = ({
  channelsInfos,
  channelId,
  memberId
}) => {
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  if (!channelInfo) throw new Error('Block Error')

  const blockedUser = channelInfo.channelBlockeds.find(
    (blocked) => blocked.id === memberId
  )

  const memberUser = channelInfo.channelMemberUser
  if (!blockedUser || !memberUser) throw new Error('Block Error')

  const [unblockUser] = useMutation<
    DeleteChannelBlockedMutation,
    DeleteChannelBlockedMutationVariables
  >(mutationDeleteChannelBlocked)

  const handleUnblockUser = async () => {
    try {
      await unblockUser({
        variables: {
          channelId: channelInfo.channel.id,
          userId: blockedUser.id
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
        src={blockedUser.avatarUrl || DefaultProfilePicture}
        alt={`Profile for ${blockedUser.username}`}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px',
          cursor: 'pointer'
        }}
      />
      <span>{blockedUser.username}</span>

      {adminAction && <button onClick={handleUnblockUser}>Unblock</button>}
    </div>
  )
}

export default ChannelBlockedProfile
