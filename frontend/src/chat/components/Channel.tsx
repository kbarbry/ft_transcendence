import React, { useState } from 'react'
import {
  Channel,
  ChannelMember,
  ChannelMessage,
  FindAllChannelMessageInChannelQuery,
  FindAllChannelMessageInChannelQueryVariables
} from '../../gql/graphql'
import { useQuery } from '@apollo/client'
import { queryFindAllChannelMessageInChannel } from '../graphql'
import ChannelChat from './ChannelChat'
interface ChannelProps {
  channel: Channel
  channelMemberUser: ChannelMember
  channelMembers: ChannelMember[]
}

const ChannelComponent: React.FC<ChannelProps> = ({
  channel,
  channelMemberUser,
  channelMembers
}) => {
  const [chat, setChat] = useState<ChannelMessage[]>([])

  try {
    const { loading, error } = useQuery<
      FindAllChannelMessageInChannelQuery,
      FindAllChannelMessageInChannelQueryVariables
    >(queryFindAllChannelMessageInChannel, {
      variables: { channelId: channel.id },
      fetchPolicy: 'network-only',
      onCompleted: (result) => {
        setChat([...result.findAllChannelMessageInChannel].reverse() || [])
      }
    })

    return (
      <>
        <div>
          <h2>{channel.name}</h2>
          {loading && <p>Loading conversation...</p>}
          {error && (
            <p>
              Error loading conversation, please try later. You can still use
              the chat
            </p>
          )}
          <ChannelChat
            channel={channel}
            channelMemberUser={channelMemberUser}
            channelMembers={channelMembers}
            chatState={{ chat, setChat }}
            key={channel.id}
          />
        </div>
      </>
    )
  } catch (e) {
    console.error('Error in Channel component:', e)
    return <p>An unexpected error occurred.</p>
  }
}

export default ChannelComponent
