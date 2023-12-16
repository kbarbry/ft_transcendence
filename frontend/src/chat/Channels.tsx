import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { ChannelAndChannelMember } from '../store/slices/channel-informations.slice'
import Channel from './components/Channel'
import { useMutation } from '@apollo/client'
import {
  mutationCreateChannel,
  mutationCreateChannelMember,
  mutationDeleteChannelInvited,
  queryFindOneChannelByName
} from './graphql'
import {
  CreateChannelMemberMutation,
  CreateChannelMemberMutationVariables,
  CreateChannelMutation,
  CreateChannelMutationVariables,
  DeleteChannelInvitedMutation,
  DeleteChannelInvitedMutationVariables,
  FindOneChannelByNameQuery,
  FindOneChannelByNameQueryVariables
} from '../gql/graphql'
import { client } from '../main'
import PopUpError from '../ErrorPages/PopUpError'

const Channels: React.FC = () => {
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const user = useAppSelector((state) => state.userInformations.user)
  const channelInvited = useAppSelector(
    (state) => state.channelInvitedInformations.channelInvitation
  )
  const channelsInfos = useAppSelector(
    (state) => state.channelInformations.channelsInfos
  )
  if (!user || !channelsInfos || !channelInvited) throw new Error()

  const [selectedChannel, setSelectedChannel] =
    useState<ChannelAndChannelMember | null>(null)
  const [channelNameInput, setChannelNameInput] = useState<string>('')
  const numberChannels = channelsInfos.length

  if (
    selectedChannel &&
    !channelsInfos.find(
      (channelInfos) => channelInfos.channel.id === selectedChannel.channel.id
    )
  ) {
    setSelectedChannel(null)
  }

  const [createChannel] = useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(mutationCreateChannel)

  const [createChannelMember] = useMutation<
    CreateChannelMemberMutation,
    CreateChannelMemberMutationVariables
  >(mutationCreateChannelMember)

  const [deleteChannelInvitation] = useMutation<
    DeleteChannelInvitedMutation,
    DeleteChannelInvitedMutationVariables
  >(mutationDeleteChannelInvited)

  const handleChannelNameInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChannelNameInput(event.target.value)
  }

  const handleCreateChannelClick = async () => {
    let isChannelAlsreadySet = true
    try {
      const { data: createChannel } = await client.query<
        FindOneChannelByNameQuery,
        FindOneChannelByNameQueryVariables
      >({
        query: queryFindOneChannelByName,
        variables: { name: channelNameInput }
      })
    } catch (error) {
      isChannelAlsreadySet = false
    }
    try {
      if (channelNameInput.trim() === '') {
        setChannelNameInput('')
        throw new Error('Empty channel name')
      }

      if (isChannelAlsreadySet == true)
        throw new Error(`"${channelNameInput}" : Channel name already use`)
      if (numberChannels >= 25) {
        setChannelNameInput('')
        throw new Error('Too many channels')
      }
      await createChannel({
        variables: { data: { name: channelNameInput, ownerId: user.id } }
      })
      setChannelNameInput('')
    } catch (Error) {
      let error_message = (Error as Error).message
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  const handleJoinChannelClick = async () => {
    let doestchannelexist = true
    if (channelNameInput.trim() === '') {
      setChannelNameInput('')
      return
    }
    if (numberChannels >= 25) {
      setChannelNameInput('')
      throw new Error('Too many channels')
    }

    try {
      const { data: createChannel } = await client.query<
        FindOneChannelByNameQuery,
        FindOneChannelByNameQueryVariables
      >({
        query: queryFindOneChannelByName,
        variables: { name: channelNameInput }
      })
    } catch (error) {
      doestchannelexist = false
    }

    const channelsList = channelsInfos.map((item) => item.channel.name)
    try {
      if (doestchannelexist == false) {
        throw new Error(`${channelNameInput} : Channel does not exist`)
      }
      const { data: dataFindChannel } = await client.query<
        FindOneChannelByNameQuery,
        FindOneChannelByNameQueryVariables
      >({
        query: queryFindOneChannelByName,
        variables: { name: channelNameInput }
      })
      const isChannelNameAlreadyJoined = channelsList.some(
        (channelName) => channelName === channelNameInput
      )
      if (isChannelNameAlreadyJoined == true) {
        throw new Error(
          `${channelNameInput} : You are already a member of this channel`
        )
      }

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
      setChannelNameInput('')
    } catch (Error) {
      let error_message = (Error as Error).message
      if (
        error_message !== `${channelNameInput} : You are already a member of this channel` &&
        error_message !== `${channelNameInput} : Channel does not exist`
      ) {
        error_message = 'Cannot join channel'
      }
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  const handleAcceptInvitation = async (channelName: string) => {
    if (numberChannels >= 25) {
      setChannelNameInput('')
      throw new Error('Too many channels')
    }

    try {
      const { data: dataFindChannel } = await client.query<
        FindOneChannelByNameQuery,
        FindOneChannelByNameQueryVariables
      >({
        query: queryFindOneChannelByName,
        variables: { name: channelName }
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
    } catch (Error) {
      const error_message = 'Failed to accept invitation'
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  const handleRefuseInvitationClick = async (
    channelId: string,
    userId: string
  ) => {
    try {
      await deleteChannelInvitation({
        variables: { channelId, userId }
      })
    } catch (Error) {
      const error_message = 'Failed to refuse invitation'
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  return (
    <>
      {isError && <PopUpError message={errorMessage} />}

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '200px', marginRight: '20px' }}>
          <h2>Channel Invitations</h2>
          <ul>
            {channelInvited.map((channelInvitation) => (
              <li key={channelInvitation.id}>
                {channelInvitation.name}
                <button
                  onClick={() => handleAcceptInvitation(channelInvitation.name)}
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleRefuseInvitationClick(channelInvitation.id, user.id)
                  }
                >
                  Refuse
                </button>
              </li>
            ))}
          </ul>
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
              channelsInfos={channelsInfos}
              channelId={selectedChannel.channel.id}
              key={selectedChannel.channel.id}
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
