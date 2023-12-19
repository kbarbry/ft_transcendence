import React, { useState } from 'react'
import {
  CreateChannelBlockedMutation,
  CreateChannelBlockedMutationVariables,
  DeleteChannelMemberMutation,
  DeleteChannelMemberMutationVariables,
  EMemberType,
  MakeChannelMemberAdminMutation,
  MakeChannelMemberAdminMutationVariables,
  MuteChannelMemberMutation,
  MuteChannelMemberMutationVariables,
  UnmakeChannelMemberAdminMutation,
  UnmakeChannelMemberAdminMutationVariables,
  UnmuteChannelMemberMutation,
  UnmuteChannelMemberMutationVariables,
  UpdateChannelMemberMutation,
  UpdateChannelMemberMutationVariables
} from '../../gql/graphql'
import { useMutation } from '@apollo/client'
import {
  mutationCreateChannelBlocked,
  mutationDeleteChannelMember,
  mutationMakeChannelMemberAdmin,
  mutationMuteChannelMember,
  mutationUnmakeChannelMemberAdmin,
  mutationUnmuteChannelMember,
  mutationUpdateChannelMember
} from '../graphql'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import { Button, Form, Input, Modal, Space } from 'antd'
import AvatarStatus, { ESize } from '../../common/avatarStatus'
import { GameInvitationButton } from '../../components/game-invitation-button/game-invitation'

interface ChannelMemberProfileProps {
  channelsInfos: ChannelAndChannelMember[]
  channelId: string
  memberId: string
}

const ChannelMemberProfile: React.FC<ChannelMemberProfileProps> = ({
  channelsInfos,
  channelId,
  memberId
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )

  if (!channelInfo) throw new Error()

  const member = channelInfo.channelMembers.find(
    (channelMember) => channelMember.userId === memberId
  )

  const memberUser = channelInfo.channelMemberUser

  if (!member || !memberUser) throw new Error()

  const [kickMember] = useMutation<
    DeleteChannelMemberMutation,
    DeleteChannelMemberMutationVariables
  >(mutationDeleteChannelMember)

  const [muteMember] = useMutation<
    MuteChannelMemberMutation,
    MuteChannelMemberMutationVariables
  >(mutationMuteChannelMember)

  const [unmuteMember] = useMutation<
    UnmuteChannelMemberMutation,
    UnmuteChannelMemberMutationVariables
  >(mutationUnmuteChannelMember)

  const [banMember] = useMutation<
    CreateChannelBlockedMutation,
    CreateChannelBlockedMutationVariables
  >(mutationCreateChannelBlocked)

  const [makeAdmin] = useMutation<
    MakeChannelMemberAdminMutation,
    MakeChannelMemberAdminMutationVariables
  >(mutationMakeChannelMemberAdmin)

  const [unmakeAdmin] = useMutation<
    UnmakeChannelMemberAdminMutation,
    UnmakeChannelMemberAdminMutationVariables
  >(mutationUnmakeChannelMemberAdmin)

  const [updateChannelMember] = useMutation<
    UpdateChannelMemberMutation,
    UpdateChannelMemberMutationVariables
  >(mutationUpdateChannelMember)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleKickMember = async () => {
    try {
      await kickMember({
        variables: {
          userId: member.userId,
          channelId: member.channelId
        }
      })
      handleCancel()
    } catch (Error) {
      const error_message = 'Cannot kick this user'
      ErrorNotification('Login Error', error_message)
    }
  }

  const handleMuteUnmuteMember = async () => {
    try {
      if (member.muted) {
        await unmuteMember({
          variables: {
            userId: member.userId,
            channelId: member.channelId
          }
        })
        handleCancel()
      } else {
        await muteMember({
          variables: {
            userId: member.userId,
            channelId: member.channelId
          }
        })
        handleCancel()
      }
    } catch (Error) {
      const error_message = 'Cannot mute/unmute this user'
      ErrorNotification('Login Error', error_message)
    }
  }

  const handleBanMember = async () => {
    try {
      await banMember({
        variables: {
          data: {
            userId: member.userId,
            channelId: member.channelId
          }
        }
      })
      handleCancel()
    } catch (Error) {
      const error_message = 'Cannot ban this user'
      ErrorNotification('Login Error', error_message)
    }
  }

  const handleMakeAdmin = async () => {
    try {
      await makeAdmin({
        variables: {
          userId: member.userId,
          channelId: member.channelId
        }
      })
      handleCancel()
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Login Error', error_message)
    }
  }

  const handleUnmakeAdmin = async () => {
    try {
      await unmakeAdmin({
        variables: {
          userId: member.userId,
          channelId: member.channelId
        }
      })
      handleCancel()
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Login Error', error_message)
    }
  }

  const handleUpdateNickname = async (values: any) => {
    try {
      await updateChannelMember({
        variables: {
          channelId: member.channelId,
          data: { nickname: values.nickname },
          userId: member.userId
        }
      })
      handleCancel()
    } catch (error) {
      const error_message = 'Cannot update nickname'
      ErrorNotification('Login Error', error_message)
    }
  }

  const adminAction =
    member.type === EMemberType.Member && memberUser.type === EMemberType.Admin
  const ownerAction =
    channelInfo.channel.ownerId === memberUser.userId &&
    member.userId !== memberUser.userId

  return (
    <>
      <Button
        type='text'
        onClick={showModal}
        style={{ height: '50px', padding: '0px', margin: '0px' }}
      >
        <Space>
          <AvatarStatus
            userId={member.userId}
            avatarUrl={member.avatarUrl}
            size={ESize.small}
          />
          <span>{member.nickname}</span>
        </Space>
      </Button>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={200}
        centered
      >
        <Space direction='vertical' align='center'>
          <AvatarStatus
            userId={member.userId}
            avatarUrl={member.avatarUrl}
            size={ESize.large}
          />
          <p>{member.nickname}</p>
          {memberId !== channelInfo.channelMemberUser.userId && (
            <GameInvitationButton targetPlayerUsername={member.nickname} />
          )}
          {(adminAction || ownerAction) && (
            <>
              {member.type !== EMemberType.Admin && (
                <Button onClick={handleMakeAdmin} type='default'>
                  Promote
                </Button>
              )}
              {member.type === EMemberType.Admin && (
                <Button onClick={handleUnmakeAdmin} danger>
                  Unpromote
                </Button>
              )}
              {member.muted ? (
                <Button onClick={handleMuteUnmuteMember} type='default'>
                  Unmute Member
                </Button>
              ) : (
                <Button onClick={handleMuteUnmuteMember} danger>
                  Mute Member
                </Button>
              )}
              <Button onClick={handleKickMember} danger>
                Kick Member
              </Button>
              <Button onClick={handleBanMember} danger>
                Ban Member
              </Button>
            </>
          )}

          {member.userId === channelInfo.channelMemberUser.userId && (
            <>
              <Form onFinish={handleUpdateNickname}>
                <Form.Item
                  name='nickname'
                  style={{ marginBottom: 2 }}
                  rules={[
                    { required: true, message: 'New nickname is required' },
                    {
                      type: 'string',
                      message: 'New nickname must be a string'
                    },
                    {
                      max: 30,
                      min: 1,
                      message:
                        'New nickname must be between 1 and 30 characters long'
                    },
                    {
                      pattern: /^[a-zA-Z0-9_\-\.]+( [a-zA-Z0-9_\-\.]+)?$/,
                      message:
                        'New nickname can only contain letters, numbers, single spaces, and "_-.".'
                    }
                  ]}
                >
                  <Input
                    type='text'
                    maxLength={30}
                    showCount
                    placeholder='New Nickname'
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{ width: '100%' }}
                  >
                    Update Nickname
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}

          <Button onClick={handleCancel}>Close</Button>
        </Space>
      </Modal>
    </>
  )
}

export default ChannelMemberProfile
