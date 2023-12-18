import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  Channel,
  ChannelMember,
  FindAllChannelInvitedInChannelQuery,
  FindAllChannelInvitedInChannelQueryVariables,
  FindAllChannelMemberInChannelQuery,
  FindAllChannelMemberInChannelQueryVariables,
  FindAllChannelMemberOfUserQuery,
  FindAllChannelMemberOfUserQueryVariables,
  FindAllInChannelBlockedQuery,
  FindAllInChannelBlockedQueryVariables,
  FindAllRelationBlockedQuery,
  FindAllRelationBlockedQueryVariables,
  FindChannelByChannelIdsQuery,
  FindChannelByChannelIdsQueryVariables,
  FindOneChannelQuery,
  FindOneChannelQueryVariables,
  FindUsersByUserIdsQuery,
  FindUsersByUserIdsQueryVariables,
  User
} from '../../gql/graphql'
import { client } from '../../main'
import {
  findAllChannelBlockedInChannel,
  findAllChannelInvitedInChannel,
  findAllChannelMemberInChannel,
  findAllChannelMemberOfUser,
  findAllRelationBlocked,
  findChannelByChannelIds,
  findOneChannel,
  findUsersByUserIds
} from '../graphql'
import { validateAvatarUrl } from '../utils'

export interface ChannelAndChannelMember {
  channel: Channel
  channelMemberUser: ChannelMember
  channelMembers: ChannelMember[]
  channelInviteds: User[]
  channelBlockeds: User[]
}

export interface ChannelInformations {
  channelsInfos: ChannelAndChannelMember[] | null
}

const initialState: ChannelInformations = {
  channelsInfos: null
}

export const setChannelInformations = createAsyncThunk(
  'channelInformations/fetchChannelInformations',
  async (userId: string) => {
    try {
      const { data: channelMembersData } = await client.query<
        FindAllChannelMemberOfUserQuery,
        FindAllChannelMemberOfUserQueryVariables
      >({
        query: findAllChannelMemberOfUser,
        variables: { userId },
        fetchPolicy: 'network-only'
      })

      const channelMembers = channelMembersData.findAllChannelMemberOfUser

      const allChannelIds = channelMembers.map((member) => member.channelId)
      const uniqueChannelIdsSet = new Set(allChannelIds)
      const channelIds = Array.from(uniqueChannelIdsSet)

      const { data: channelsData } = await client.query<
        FindChannelByChannelIdsQuery,
        FindChannelByChannelIdsQueryVariables
      >({
        query: findChannelByChannelIds,
        variables: { channelIds }
      })

      const channels = channelsData.findChannelByChannelIds

      const channelsInfos: (ChannelAndChannelMember | null)[] =
        await Promise.all(
          channelMembers.map(async (member) => {
            const channel = channels.find((c) => c.id === member.channelId)

            if (channel) {
              const { data: dataBlockedsIds } = await client.query<
                FindAllRelationBlockedQuery,
                FindAllRelationBlockedQueryVariables
              >({
                query: findAllRelationBlocked,
                variables: { findAllRelationBlockedByUserId: userId },
                fetchPolicy: 'network-only'
              })

              const { data: channelMembersInChannelData } = await client.query<
                FindAllChannelMemberInChannelQuery,
                FindAllChannelMemberInChannelQueryVariables
              >({
                query: findAllChannelMemberInChannel,
                variables: { channelId: channel.id },
                fetchPolicy: 'network-only'
              })

              const { data: channelInvitedsInChannelData } = await client.query<
                FindAllChannelInvitedInChannelQuery,
                FindAllChannelInvitedInChannelQueryVariables
              >({
                query: findAllChannelInvitedInChannel,
                variables: { channelId: channel.id },
                fetchPolicy: 'network-only'
              })

              const channelInvitedUserIds =
                channelInvitedsInChannelData.findAllChannelInvitedInChannel.map(
                  (obj) => obj.userId
                )

              const { data: channelInvitedsUserInChannel } = await client.query<
                FindUsersByUserIdsQuery,
                FindUsersByUserIdsQueryVariables
              >({
                query: findUsersByUserIds,
                variables: { userIds: channelInvitedUserIds }
              })

              const { data: channelBlockedsInChannelData } = await client.query<
                FindAllInChannelBlockedQuery,
                FindAllInChannelBlockedQueryVariables
              >({
                query: findAllChannelBlockedInChannel,
                variables: { channelId: channel.id }
              })

              const channelBlockedUserIds =
                channelBlockedsInChannelData.findAllInChannelBlocked.map(
                  (obj) => obj.userId
                )

              const { data: channelBlockedsUserInChannel } = await client.query<
                FindUsersByUserIdsQuery,
                FindUsersByUserIdsQueryVariables
              >({
                query: findUsersByUserIds,
                variables: { userIds: channelBlockedUserIds }
              })

              const userBlocked = dataBlockedsIds.findAllRelationBlockedByUser

              const channelMembersInChannel =
                channelMembersInChannelData.findAllChannelMemberInChannel

              const userMember = channelMembersInChannel.find(
                (member) => member.userId === userId
              )

              if (!userMember) throw new Error()

              const filteredChannelMembersInChannel =
                channelMembersInChannel.filter(
                  (member) =>
                    !userBlocked.some(
                      (blockedUser) => blockedUser === member.userId
                    )
                )

              const channelInvitedsInChannel =
                channelInvitedsUserInChannel.findUsersByUserIds

              const filteredChannelInvitedsInChannel =
                channelInvitedsInChannel.filter(
                  (member) =>
                    !userBlocked.some(
                      (blockedUser) => blockedUser === member.id
                    )
                )

              const channelBlockedsInChannel =
                channelBlockedsUserInChannel.findUsersByUserIds

              const filteredChannelBlockedsInChannel =
                channelBlockedsInChannel.filter(
                  (member) =>
                    !userBlocked.some(
                      (blockedUser) => blockedUser === member.id
                    )
                )

              return {
                channel: channel,
                channelMemberUser: userMember,
                channelMembers: filteredChannelMembersInChannel,
                channelInviteds: filteredChannelInvitedsInChannel,
                channelBlockeds: filteredChannelBlockedsInChannel
              }
            }
            return null
          })
        )

      const filteredChannelsInfos: ChannelAndChannelMember[] =
        channelsInfos.filter(
          (entry): entry is ChannelAndChannelMember => entry !== null
        )

      const validatedChannelsInfos: ChannelAndChannelMember[] =
        await Promise.all(
          filteredChannelsInfos.map(async (channelInfo) => {
            let {
              channel,
              channelMemberUser,
              channelMembers,
              channelInviteds,
              channelBlockeds
            } = channelInfo

            channel = {
              ...channel,
              avatarUrl: await validateAvatarUrl(channel.avatarUrl)
            }
            channelMemberUser = {
              ...channelMemberUser,
              avatarUrl: await validateAvatarUrl(channelMemberUser.avatarUrl)
            }
            channelMembers = await Promise.all(
              channelMembers.map(async (member) => ({
                ...member,
                avatarUrl: await validateAvatarUrl(member.avatarUrl)
              }))
            )
            channelInviteds = await Promise.all(
              channelInviteds.map(async (member) => ({
                ...member,
                avatarUrl: await validateAvatarUrl(member.avatarUrl)
              }))
            )
            channelBlockeds = await Promise.all(
              channelBlockeds.map(async (member) => ({
                ...member,
                avatarUrl: await validateAvatarUrl(member.avatarUrl)
              }))
            )

            return {
              channel,
              channelMemberUser,
              channelMembers,
              channelInviteds,
              channelBlockeds
            }
          })
        )

      return validatedChannelsInfos || []
    } catch (e) {
      console.log('Error channel slice: ', e)
      throw e
    }
  }
)

export const removeChannelInfo = createAsyncThunk(
  'channelInformations/removeChannelInformations',
  (channelId: string, { getState }) => {
    try {
      const state = getState() as {
        channelInformations: ChannelInformations
      }
      const channelsInfos = state?.channelInformations?.channelsInfos
      if (!channelsInfos) return []

      const updatedChannelsInfos = channelsInfos.map((existingChannelInfo) => {
        if (existingChannelInfo.channel.id === channelId) {
          return null
        }
        return existingChannelInfo
      })

      const filteredChannelsInfos = updatedChannelsInfos.filter(
        (channelInfo): channelInfo is ChannelAndChannelMember =>
          channelInfo !== null
      )

      return filteredChannelsInfos
    } catch (e) {
      console.log('Error channel slice, channelMembers: ', e)
      throw e
    }
  }
)

export const setChannelMembersInformations = createAsyncThunk(
  'channelMembersInformations/fetchChannelMembersInformations',
  async (channelId: string, { getState }) => {
    try {
      const state = getState() as {
        channelInformations: ChannelInformations
      }
      const channelsInfos = state.channelInformations.channelsInfos
      if (!channelsInfos) return []
      const channel = channelsInfos.find((c) => c.channel.id === channelId)

      if (channel) {
        const userId = channel.channelMemberUser.userId
        const { data: dataBlockedsIds } = await client.query<
          FindAllRelationBlockedQuery,
          FindAllRelationBlockedQueryVariables
        >({
          query: findAllRelationBlocked,
          variables: {
            findAllRelationBlockedByUserId: userId
          },
          fetchPolicy: 'network-only'
        })

        const { data: channelMembersInChannelData } = await client.query<
          FindAllChannelMemberInChannelQuery,
          FindAllChannelMemberInChannelQueryVariables
        >({
          query: findAllChannelMemberInChannel,
          variables: { channelId },
          fetchPolicy: 'network-only'
        })

        const userBlocked = dataBlockedsIds.findAllRelationBlockedByUser

        const updatedChannelMembers =
          channelMembersInChannelData.findAllChannelMemberInChannel

        const userMember = updatedChannelMembers.find(
          (member) => member.userId === userId
        )

        if (!userMember) throw new Error()

        const filteredChannelMembersInChannel = updatedChannelMembers.filter(
          (member) =>
            !userBlocked.some((blockedUser) => blockedUser === member.userId)
        )

        const channelMemberUserValidation = {
          ...userMember,
          avatarUrl: await validateAvatarUrl(userMember.avatarUrl)
        }

        const channelMembersValidated = await Promise.all(
          filteredChannelMembersInChannel.map(async (member) => ({
            ...member,
            avatarUrl: await validateAvatarUrl(member.avatarUrl)
          }))
        )

        const updatedChannelsInfos = channelsInfos.map(
          (existingChannelInfo) => {
            if (existingChannelInfo.channel.id === channelId) {
              return {
                ...existingChannelInfo,
                channelMemberUser: channelMemberUserValidation,
                channelMembers: [...channelMembersValidated]
              }
            }
            return existingChannelInfo
          }
        )
        return updatedChannelsInfos
      }
      return channelsInfos
    } catch (e) {
      console.log('Error channel slice, channelMembers: ', e)
      throw e
    }
  }
)

export const setChannelChannelInformations = createAsyncThunk(
  'channelsChannelInformations/fetchChannelChannelInformations',
  async (channelId: string, { getState }) => {
    try {
      const state = getState() as {
        channelInformations: ChannelInformations
      }
      const channelsInfos = state.channelInformations.channelsInfos
      if (!channelsInfos) return []
      const channel = channelsInfos.find((c) => c.channel.id === channelId)

      if (channel) {
        const { data: channelsChannelInChannelData } = await client.query<
          FindOneChannelQuery,
          FindOneChannelQueryVariables
        >({
          query: findOneChannel,
          variables: { findOneChannelId: channelId },
          fetchPolicy: 'network-only'
        })

        const updatedChannelsChannel =
          channelsChannelInChannelData.findOneChannel

        const updatedChannelsInfos = channelsInfos.map(
          (existingChannelInfo) => {
            if (existingChannelInfo.channel.id === channelId) {
              return {
                ...existingChannelInfo,
                channel: updatedChannelsChannel
              }
            }
            return existingChannelInfo
          }
        )

        return updatedChannelsInfos
      }
      return channelsInfos
    } catch (e) {
      console.log('Error channel slice, channelsChannel: ', e)
      throw e
    }
  }
)

export const setChannelInvitedsInformations = createAsyncThunk(
  'channelInvitedsInformations/fetchChannelInvitedsInformations',
  async (channelId: string, { getState }) => {
    try {
      const state = getState() as {
        channelInformations: ChannelInformations
      }
      const channelsInfos = state.channelInformations.channelsInfos
      if (!channelsInfos) return []
      const channel = channelsInfos.find((c) => c.channel.id === channelId)

      if (channel) {
        const { data: dataBlockedsIds } = await client.query<
          FindAllRelationBlockedQuery,
          FindAllRelationBlockedQueryVariables
        >({
          query: findAllRelationBlocked,
          variables: {
            findAllRelationBlockedByUserId: channel.channelMemberUser.userId
          },
          fetchPolicy: 'network-only'
        })

        const { data: channelInvitedsInChannelData } = await client.query<
          FindAllChannelInvitedInChannelQuery,
          FindAllChannelInvitedInChannelQueryVariables
        >({
          query: findAllChannelInvitedInChannel,
          variables: { channelId },
          fetchPolicy: 'network-only'
        })

        const updatedChannelInviteds =
          channelInvitedsInChannelData.findAllChannelInvitedInChannel.map(
            (obj) => obj.userId
          )

        const { data: channelInvitedsUserInChannel } = await client.query<
          FindUsersByUserIdsQuery,
          FindUsersByUserIdsQueryVariables
        >({
          query: findUsersByUserIds,
          variables: { userIds: updatedChannelInviteds }
        })

        const userBlocked = dataBlockedsIds.findAllRelationBlockedByUser

        const updatedChannelInvitedsUsers =
          channelInvitedsUserInChannel.findUsersByUserIds

        const filteredChannelInvitedsInChannel =
          updatedChannelInvitedsUsers.filter(
            (member) =>
              !userBlocked.some((blockedUser) => blockedUser === member.id)
          )

        const channelInvitedsValidated = await Promise.all(
          filteredChannelInvitedsInChannel.map(async (member) => ({
            ...member,
            avatarUrl: await validateAvatarUrl(member.avatarUrl)
          }))
        )

        const updatedChannelsInfos = channelsInfos.map(
          (existingChannelInfo) => {
            if (existingChannelInfo.channel.id === channelId) {
              return {
                ...existingChannelInfo,
                channelInviteds: [...channelInvitedsValidated]
              }
            }
            return existingChannelInfo
          }
        )

        return updatedChannelsInfos
      }
      return channelsInfos
    } catch (e) {
      console.log('Error channel slice, channelInviteds: ', e)
      throw e
    }
  }
)

export const setChannelBlockedsInformations = createAsyncThunk(
  'channelBlockedsInformations/fetchChannelBlockedsInformations',
  async (channelId: string, { getState }) => {
    try {
      const state = getState() as {
        channelInformations: ChannelInformations
      }
      const channelsInfos = state.channelInformations.channelsInfos
      if (!channelsInfos) return []
      const channel = channelsInfos.find((c) => c.channel.id === channelId)

      if (channel) {
        const { data: dataBlockedsIds } = await client.query<
          FindAllRelationBlockedQuery,
          FindAllRelationBlockedQueryVariables
        >({
          query: findAllRelationBlocked,
          variables: {
            findAllRelationBlockedByUserId: channel.channelMemberUser.userId
          },
          fetchPolicy: 'network-only'
        })

        const { data: channelBlockedsInChannelData } = await client.query<
          FindAllInChannelBlockedQuery,
          FindAllInChannelBlockedQueryVariables
        >({
          query: findAllChannelBlockedInChannel,
          variables: { channelId },
          fetchPolicy: 'network-only'
        })

        const channelBlockedUserIds =
          channelBlockedsInChannelData.findAllInChannelBlocked.map(
            (obj) => obj.userId
          )

        const { data: channelBlockedsUserInChannel } = await client.query<
          FindUsersByUserIdsQuery,
          FindUsersByUserIdsQueryVariables
        >({
          query: findUsersByUserIds,
          variables: { userIds: channelBlockedUserIds }
        })

        const userBlocked = dataBlockedsIds.findAllRelationBlockedByUser

        const updatedChannelBlockedsUsers =
          channelBlockedsUserInChannel.findUsersByUserIds

        const filteredChannelBlockedsInChannel =
          updatedChannelBlockedsUsers.filter(
            (member) =>
              !userBlocked.some((blockedUser) => blockedUser === member.id)
          )

        const channelBlockedsValidated = await Promise.all(
          filteredChannelBlockedsInChannel.map(async (member) => ({
            ...member,
            avatarUrl: await validateAvatarUrl(member.avatarUrl)
          }))
        )

        const updatedChannelsInfos = channelsInfos.map(
          (existingChannelInfo) => {
            if (existingChannelInfo.channel.id === channelId) {
              return {
                ...existingChannelInfo,
                channelBlockeds: [...channelBlockedsValidated]
              }
            }
            return existingChannelInfo
          }
        )

        return updatedChannelsInfos
      }
      return channelsInfos
    } catch (e) {
      console.log('Error channel slice, channelInviteds: ', e)
      throw e
    }
  }
)

export const addChannelInfo = createAsyncThunk(
  'channelInformations/addChannelInformations',
  async (infos: { channelId: string; userId: string }, { getState }) => {
    try {
      const state = getState() as {
        channelInformations: ChannelInformations
      }
      const channelsInfos = state?.channelInformations?.channelsInfos
      if (!channelsInfos) return channelsInfos

      const { data: channelDatas } = await client.query<
        FindOneChannelQuery,
        FindOneChannelQueryVariables
      >({
        query: findOneChannel,
        variables: { findOneChannelId: infos.channelId }
      })

      const channel = channelDatas.findOneChannel

      if (channel) {
        const { data: dataBlockedsIds } = await client.query<
          FindAllRelationBlockedQuery,
          FindAllRelationBlockedQueryVariables
        >({
          query: findAllRelationBlocked,
          variables: { findAllRelationBlockedByUserId: infos.userId },
          fetchPolicy: 'network-only'
        })

        const { data: channelMembersInChannelData } = await client.query<
          FindAllChannelMemberInChannelQuery,
          FindAllChannelMemberInChannelQueryVariables
        >({
          query: findAllChannelMemberInChannel,
          variables: { channelId: infos.channelId },
          fetchPolicy: 'network-only'
        })

        const { data: channelInvitedsInChannelData } = await client.query<
          FindAllChannelInvitedInChannelQuery,
          FindAllChannelInvitedInChannelQueryVariables
        >({
          query: findAllChannelInvitedInChannel,
          variables: { channelId: infos.channelId },
          fetchPolicy: 'network-only'
        })

        const channelInvitedUserIds =
          channelInvitedsInChannelData.findAllChannelInvitedInChannel.map(
            (obj) => obj.userId
          )

        const { data: channelInvitedsUserInChannel } = await client.query<
          FindUsersByUserIdsQuery,
          FindUsersByUserIdsQueryVariables
        >({
          query: findUsersByUserIds,
          variables: { userIds: channelInvitedUserIds }
        })

        const { data: channelBlockedsInChannelData } = await client.query<
          FindAllInChannelBlockedQuery,
          FindAllInChannelBlockedQueryVariables
        >({
          query: findAllChannelBlockedInChannel,
          variables: { channelId: infos.channelId }
        })

        const channelBlockedUserIds =
          channelBlockedsInChannelData.findAllInChannelBlocked.map(
            (obj) => obj.userId
          )

        const { data: channelBlockedsUserInChannel } = await client.query<
          FindUsersByUserIdsQuery,
          FindUsersByUserIdsQueryVariables
        >({
          query: findUsersByUserIds,
          variables: { userIds: channelBlockedUserIds }
        })

        const userBlocked = dataBlockedsIds.findAllRelationBlockedByUser

        const channelMembersInChannel =
          channelMembersInChannelData.findAllChannelMemberInChannel

        const userMember = channelMembersInChannel.find(
          (member) => member.userId === infos.userId
        )

        if (!userMember) throw new Error()

        const filteredChannelMembersInChannel = channelMembersInChannel.filter(
          (member) =>
            !userBlocked.some((blockedUser) => blockedUser === member.userId)
        )

        const channelInvitedsInChannel =
          channelInvitedsUserInChannel.findUsersByUserIds

        const filteredChannelInvitedsInChannel =
          channelInvitedsInChannel.filter(
            (member) =>
              !userBlocked.some((blockedUser) => blockedUser === member.id)
          )

        const channelBlockedsInChannel =
          channelBlockedsUserInChannel.findUsersByUserIds

        const filteredChannelBlockedsInChannel =
          channelBlockedsInChannel.filter(
            (member) =>
              !userBlocked.some((blockedUser) => blockedUser === member.id)
          )

        const resNotVerified = {
          channelInf: channel,
          channelMemberUser: userMember,
          channelMembers: filteredChannelMembersInChannel,
          channelInviteds: filteredChannelInvitedsInChannel,
          channelBlockeds: filteredChannelBlockedsInChannel
        }

        let {
          channelInf,
          channelMemberUser,
          channelMembers,
          channelInviteds,
          channelBlockeds
        } = resNotVerified

        channelInf = {
          ...channel,
          avatarUrl: await validateAvatarUrl(channel.avatarUrl)
        }
        channelMemberUser = {
          ...channelMemberUser,
          avatarUrl: await validateAvatarUrl(channelMemberUser.avatarUrl)
        }
        channelMembers = await Promise.all(
          channelMembers.map(async (member) => ({
            ...member,
            avatarUrl: await validateAvatarUrl(member.avatarUrl)
          }))
        )
        channelInviteds = await Promise.all(
          channelInviteds.map(async (member) => ({
            ...member,
            avatarUrl: await validateAvatarUrl(member.avatarUrl)
          }))
        )
        channelBlockeds = await Promise.all(
          channelBlockeds.map(async (member) => ({
            ...member,
            avatarUrl: await validateAvatarUrl(member.avatarUrl)
          }))
        )
        const newChannel: ChannelAndChannelMember = {
          channel: channelInf,
          channelMemberUser,
          channelMembers,
          channelInviteds,
          channelBlockeds
        }

        return [...channelsInfos, newChannel]
      } else return channelsInfos
    } catch (e) {
      console.log('Error channel slice, addChannel: ', e)
      throw e
    }
  }
)

export const channelInformationsSlice = createSlice({
  name: 'channelInformations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setChannelInformations.fulfilled, (state, action) => {
        return {
          ...state,
          channelsInfos: action.payload
        }
      })
      .addCase(setChannelChannelInformations.fulfilled, (state, action) => {
        return { ...state, channelsInfos: action.payload }
      })
      .addCase(setChannelMembersInformations.fulfilled, (state, action) => {
        return { ...state, channelsInfos: action.payload }
      })
      .addCase(setChannelInvitedsInformations.fulfilled, (state, action) => {
        return { ...state, channelsInfos: action.payload }
      })
      .addCase(setChannelBlockedsInformations.fulfilled, (state, action) => {
        return { ...state, channelsInfos: action.payload }
      })
      .addCase(removeChannelInfo.fulfilled, (state, action) => {
        return { ...state, channelsInfos: action.payload }
      })
      .addCase(addChannelInfo.fulfilled, (state, action) => {
        return { ...state, channelsInfos: action.payload }
      })
  }
})

export default channelInformationsSlice.reducer
