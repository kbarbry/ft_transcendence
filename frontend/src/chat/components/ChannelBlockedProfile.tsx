import React from 'react'
import { useMutation } from '@apollo/client'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'
import {
  DeleteChannelBlockedMutation,
  DeleteChannelBlockedMutationVariables,
  EMemberType
} from '../../gql/graphql'
import { mutationDeleteChannelBlocked } from '../graphql'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'

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

  if (!channelInfo) throw new Error('PROBLEM HERE')

  const blockedUser = channelInfo.channelBlockeds.find(
    (blocked) => blocked.id === memberId
  )

  const memberUser = channelInfo.channelMemberUser
  console.log(blockedUser)
  console.log(memberUser)
  if (!blockedUser || !memberUser) throw new Error('PROBLEM HERE2')

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
      console.log('User unblocked successfully')
    } catch (error) {
      console.error('Error unblocking user:', error)
    }
  }

  const adminAction = memberUser.type === EMemberType.Admin

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
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
