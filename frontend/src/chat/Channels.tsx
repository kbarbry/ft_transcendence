import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  ChannelAndChannelMember,
  setChannelInformations
} from '../store/slices/channel-informations.slice'
import Channel from './components/Channel'
import { useMutation } from '@apollo/client'
import {
  mutationCreateChannel,
  mutationCreateChannelMember,
  queryFindOneChannelByName
} from './graphql'
import {
  CreateChannelMemberMutation,
  CreateChannelMemberMutationVariables,
  CreateChannelMutation,
  CreateChannelMutationVariables,
  FindOneChannelByNameQuery,
  FindOneChannelByNameQueryVariables
} from '../gql/graphql'
import { client } from '../main'

const Channels: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userInformations.user)
  const channelsInfos = useAppSelector(
    (state) => state.channelInformations.channelsInfos
  )

  if (!user || !channelsInfos) throw new Error()

  const [selectedChannel, setSelectedChannel] =
    useState<ChannelAndChannelMember | null>(null)
  const [channelNameInput, setChannelNameInput] = useState<string>('')

  const [createChannel] = useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(mutationCreateChannel)
  const [createChannelMember] = useMutation<
    CreateChannelMemberMutation,
    CreateChannelMemberMutationVariables
  >(mutationCreateChannelMember)

  const handleChannelNameInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChannelNameInput(event.target.value)
  }

  const handleCreateChannelClick = async () => {
    if (channelNameInput.trim() === '') {
      return
    }
    try {
      await createChannel({
        variables: { data: { name: channelNameInput, ownerId: user.id } }
      })

      await dispatch(setChannelInformations(user.id))
      setChannelNameInput('')
    } catch (e) {
      setChannelNameInput('')
      console.error('Error creating channel: ', e)
      throw e
    }
  }

  const handleJoinChannelClick = async () => {
    if (channelNameInput.trim() === '') {
      return
    }
    try {
      const { data: dataFindChannel } = await client.query<
        FindOneChannelByNameQuery,
        FindOneChannelByNameQueryVariables
      >({
        query: queryFindOneChannelByName,
        variables: { name: channelNameInput }
      })

      const channel = dataFindChannel.findOneChannelByName

      await createChannelMember({
        variables: {
          data: {
            channelId: channel.id,
            userId: user.id,
            avatarUrl: user.avatarUrl,
            nickname: user.username
          }
        }
      })

      await dispatch(setChannelInformations(user.id))
      setChannelNameInput('')
    } catch (e) {
      setChannelNameInput('')
      throw e
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '200px', marginRight: '20px' }}>
          <h2>Channels</h2>
          <ul>
            {channelsInfos.map((channelInfos) => (
              <li key={channelInfos.channel.id}>
                <button onClick={() => setSelectedChannel(channelInfos)}>
                  {channelInfos.channel.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type='text'
            value={channelNameInput}
            onChange={handleChannelNameInput}
          />
          <button onClick={handleCreateChannelClick}>Create Channel</button>
          <button onClick={handleJoinChannelClick}>Join Channel</button>
        </div>
        <div>
          {selectedChannel ? (
            <Channel
              key={selectedChannel.channel.id}
              channel={selectedChannel.channel}
              channelMemberUser={selectedChannel.channelMemberUser}
              channelMembers={selectedChannel.channelMembers}
            />
          ) : (
            <p>select a channel to start chatting</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Channels
