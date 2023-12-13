import React, { useState } from 'react'
import {
  ChannelMessage,
  CreateChannelInvitedMutation,
  CreateChannelInvitedMutationVariables,
  DeleteChannelMutation,
  DeleteChannelMutationVariables,
  FindAllChannelMessageInChannelQuery,
  FindAllChannelMessageInChannelQueryVariables,
  FindOneUserByUsernameQuery,
  FindOneUserByUsernameQueryVariables
} from '../../gql/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
  mutationCreateChannelInvited,
  mutationDeleteChannel,
  queryFindAllChannelMessageInChannel
} from '../graphql'
import ChannelChat from './ChannelChat'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'
import ChannelMemberProfile from './ChannelMemberProfile'
import ChannelInvitedProfile from './ChannelInvitedProfile'
import ChannelBlockedProfile from './ChannelBlockedProfile'
import { client } from '../../main'
import { findOneUserByUsername } from '../../relations/graphql'

interface ChannelProps {
  channelsInfos: ChannelAndChannelMember[]
  channelId: string
}

const ChannelComponent: React.FC<ChannelProps> = ({
  channelsInfos,
  channelId
}) => {
  const [chat, setChat] = useState<ChannelMessage[]>([])
  const [channelInviteInput, setChannelInviteInput] = useState('')
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )

  if (!channelInfo) throw new Error()

  const [createChannelInvited] = useMutation<
    CreateChannelInvitedMutation,
    CreateChannelInvitedMutationVariables
  >(mutationCreateChannelInvited)

  const [deleteChannel] = useMutation<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >(mutationDeleteChannel)

  try {
    const { loading, error } = useQuery<
      FindAllChannelMessageInChannelQuery,
      FindAllChannelMessageInChannelQueryVariables
    >(queryFindAllChannelMessageInChannel, {
      variables: { channelId },
      fetchPolicy: 'network-only',
      onCompleted: (result) => {
        setChat([...result.findAllChannelMessageInChannel].reverse() || [])
      }
    })

    const handleInviteUser = async () => {
      try {
        const data = await client.query<
          FindOneUserByUsernameQuery,
          FindOneUserByUsernameQueryVariables
        >({
          query: findOneUserByUsername,
          variables: { username: channelInviteInput }
        })

        await createChannelInvited({
          variables: {
            data: {
              channelId: channelInfo.channel.id,
              userId: data.data.findOneUserByUsername.id
            }
          }
        })
        console.log('User invited successfully')
        setChannelInviteInput('')
      } catch (error) {
        console.error('Error inviting user:', error)
      }
    }

    const handleDeleteChannel = async () => {
      try {
        await deleteChannel({
          variables: { deleteChannelId: channelId }
        })
        console.log('Channel deleted successfully')
      } catch (error) {
        console.error('Error deleting channel:', error)
      }
    }

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div
          style={{
            flex: '0 0 70%',
            padding: '20px',
            borderRight: '1px solid #ccc'
          }}
        >
          <h2>{channelInfo.channel.name}</h2>
          {loading && <p>Loading conversation...</p>}
          {error && (
            <p>
              Error loading conversation, please try later. You can still use
              the chat
            </p>
          )}
          <ChannelChat
            channelsInfos={channelsInfos}
            channelId={channelId}
            chatState={{ chat, setChat }}
            key={channelInfo.channel.id}
          />
        </div>
        <div style={{ flex: '0 0 30%', padding: '20px' }}>
          <div>
            <h2>Channel Infos</h2>
            <button onClick={handleDeleteChannel}>Delete Channel</button>
          </div>
          <h2>Channel Members</h2>
          <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
            {channelInfo.channelMembers.map((member) => (
              <ChannelMemberProfile
                channelsInfos={channelsInfos}
                channelId={channelId}
                memberId={member.userId}
                key={member.userId}
              />
            ))}
          </div>
          <h2>Channel Invited</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type='text'
              placeholder='Enter username'
              value={channelInviteInput}
              onChange={(e) => setChannelInviteInput(e.target.value)}
            />
            <button onClick={handleInviteUser}>Invite User</button>
          </div>
          <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
            {channelInfo.channelInviteds.map((member) => (
              <ChannelInvitedProfile
                channelsInfos={channelsInfos}
                channelId={channelId}
                memberId={member.id}
                key={member.id}
              />
            ))}
          </div>
          <h2>Channel Blocked</h2>
          <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
            {channelInfo.channelBlockeds.map((member) => (
              <ChannelBlockedProfile
                channelsInfos={channelsInfos}
                channelId={channelId}
                memberId={member.id}
                key={member.id}
              />
            ))}
          </div>
        </div>
      </div>
    )
  } catch (e) {
    console.error('Error in Channel component:', e)
    return <p>An unexpected error occurred.</p>
  }
}

export default ChannelComponent
