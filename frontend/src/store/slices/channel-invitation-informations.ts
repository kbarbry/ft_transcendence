import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  Channel,
  FindAllChannelInvitedOfUserQuery,
  FindAllChannelInvitedOfUserQueryVariables,
  FindChannelByChannelIdsQuery,
  FindChannelByChannelIdsQueryVariables
} from '../../gql/graphql'
import { client } from '../../main'
import {
  findAllChannelInvitedOfUser,
  findChannelByChannelIds
} from '../graphql'

export interface ChannelInvitationInformations {
  channelInvitation: Channel[] | null
}

const initialState: ChannelInvitationInformations = {
  channelInvitation: null
}

export const setChannelInvitations = createAsyncThunk(
  'channelInvitation/fetchChannelInvitationInformations',
  async (userId: string) => {
    try {
      console.log('newChannelInvitation')
      let res: Channel[] = []

      const { data: dataChannelInvitation } = await client.query<
        FindAllChannelInvitedOfUserQuery,
        FindAllChannelInvitedOfUserQueryVariables
      >({
        query: findAllChannelInvitedOfUser,
        variables: { userId },
        fetchPolicy: 'network-only'
      })
      console.log(JSON.stringify(dataChannelInvitation))

      const channelInvitation =
        dataChannelInvitation?.findAllChannelInvitedOfUser

      if (!channelInvitation.length) return res
      console.log('CHANNELSINVIT', channelInvitation)
      const userIdsArray = channelInvitation.map(
        (invitation) => invitation.channelId
      )
      console.log('USERIDS TAB', userIdsArray)
      const { data: dataChannels } = await client.query<
        FindChannelByChannelIdsQuery,
        FindChannelByChannelIdsQueryVariables
      >({
        query: findChannelByChannelIds,
        variables: { channelIds: userIdsArray }
      })

      const channels = dataChannels.findChannelByChannelIds
      console.log('CHANNELS', channels)
      return channels
    } catch (e) {
      console.log('Error channelInvitation slice: ', e)
      throw e
    }
  }
)

export const removeChannelInvitation = createAsyncThunk(
  'channelInvitation/removeChannelInvitationInformations',
  async (channelId: string, { getState }) => {
    try {
      console.log('delete channel infos')
      const state = getState() as {
        channelInvitation: ChannelInvitationInformations
      }
      const channelsInfos = state?.channelInvitation?.channelInvitation
      console.log('infos', JSON.stringify(channelsInfos))
      if (!channelsInfos) return []

      const updatedChannelInvitedInfo = channelsInfos.map(
        (channelInvitation) => {
          if (channelInvitation.id === channelId) {
            return null
          }
          return channelInvitation
        }
      )
      const filteredChannelsInfos = updatedChannelInvitedInfo.filter(
        (channelInfo): channelInfo is Channel => channelInfo !== null
      )

      console.log('DATA: ', JSON.stringify(filteredChannelsInfos))

      return filteredChannelsInfos
    } catch (e) {
      console.log('Error channelInvitation slice, remove: ', e)
      throw e
    }
  }
)

export const channelInvitationsSlice = createSlice({
  name: 'channelInvitation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setChannelInvitations.fulfilled, (state, action) => {
        return {
          ...state,
          channelInvitation: action.payload
        }
      })
      .addCase(removeChannelInvitation.fulfilled, (state, action) => {
        return {
          ...state,
          channelInvitation: action.payload
        }
      })
  }
})

export default channelInvitationsSlice.reducer
