import React, { useState } from 'react'
import {
  ChannelMessage,
  FindAllChannelMessageInChannelQuery,
  FindAllChannelMessageInChannelQueryVariables
} from '../../gql/graphql'
import { useQuery } from '@apollo/client'
import { queryFindAllChannelMessageInChannel } from '../graphql'
import ChannelChat from './ChannelChat'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'
interface ChannelProps {
  channelsInfos: ChannelAndChannelMember[]
  channelId: string
}

const ChannelComponent: React.FC<ChannelProps> = ({
  channelsInfos,
  channelId
}) => {
  const [chat, setChat] = useState<ChannelMessage[]>([])
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )

  if (!channelInfo) throw new Error()

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

    return (
      <>
        <div>
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
      </>
    )
  } catch (e) {
    console.error('Error in Channel component:', e)
    return <p>An unexpected error occurred.</p>
  }
}

export default ChannelComponent
