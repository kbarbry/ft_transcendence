import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  DeleteChannelInvitedMutation,
  DeleteChannelInvitedMutationVariables,
  EMemberType
} from '../../gql/graphql'
import { mutationDeleteChannelInvited } from '../graphql'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'
import { Button, Modal, Space } from 'antd'
import AvatarStatus, { ESize } from '../../common/avatarStatus'
import ErrorNotification from '../../notifications/ErrorNotificartion'

interface ChannelInvitedProfileProps {
  channelsInfos: ChannelAndChannelMember[]
  channelId: string
  memberId: string
}

const ChannelInvitedProfile: React.FC<ChannelInvitedProfileProps> = ({
  channelsInfos,
  channelId,
  memberId
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )

  if (!channelInfo) throw new Error('Invalid cancel invitation')

  const invitedUser = channelInfo.channelInviteds.find(
    (invited) => invited.id === memberId
  )

  const memberUser = channelInfo.channelMemberUser

  if (!invitedUser || !memberUser) throw new Error('Invalid cancel invitation')

  const [uninviteUser] = useMutation<
    DeleteChannelInvitedMutation,
    DeleteChannelInvitedMutationVariables
  >(mutationDeleteChannelInvited)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleUninviteUser = async () => {
    try {
      await uninviteUser({
        variables: {
          channelId: channelInfo.channel.id,
          userId: invitedUser.id
        }
      })
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Channel error', error_message)
    }
  }

  const adminAction = memberUser.type === EMemberType.Admin

  return (
    <>
      <Button
        type='text'
        onClick={showModal}
        style={{ height: '50px', padding: '0px', margin: '0px' }}
      >
        <Space>
          <AvatarStatus
            userId={invitedUser.id}
            avatarUrl={invitedUser.avatarUrl}
            size={ESize.small}
          />
          <span>{invitedUser.username}</span>
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
            userId={invitedUser.id}
            avatarUrl={invitedUser.avatarUrl}
            size={ESize.large}
          />
          <p>{invitedUser.username}</p>
          {adminAction && (
            <>
              <Button onClick={handleUninviteUser} danger>
                Uninvite Member
              </Button>
            </>
          )}

          <Button onClick={handleCancel}>Close</Button>
        </Space>
      </Modal>
    </>
  )
}

export default ChannelInvitedProfile
