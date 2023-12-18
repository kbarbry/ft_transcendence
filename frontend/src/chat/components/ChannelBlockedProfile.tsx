import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  DeleteChannelBlockedMutation,
  DeleteChannelBlockedMutationVariables,
  EMemberType
} from '../../gql/graphql'
import { mutationDeleteChannelBlocked } from '../graphql'
import { ChannelAndChannelMember } from '../../store/slices/channel-informations.slice'
import PopUpError from '../../ErrorPages/PopUpError'
import { Button, Modal, Space } from 'antd'
import AvatarStatus, { ESize } from '../../common/avatarStatus'
import ErrorNotification from '../../notifications/ErrorNotificartion'


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
  const [isModalVisible, setIsModalVisible] = useState(false)
  const channelInfo = channelsInfos.find(
    (channelInfo) => channelInfo.channel.id === channelId
  )


  if (!channelInfo) throw new Error('Block Error')

  const blockedUser = channelInfo.channelBlockeds.find(
    (blocked) => blocked.id === memberId
  )

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const memberUser = channelInfo.channelMemberUser
  if (!blockedUser || !memberUser) throw new Error('Block Error')

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
    } catch (Error) {
      const error_message = (Error as Error).message
      ErrorNotification('Login Error', error_message)
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
            userId={blockedUser.id}
            avatarUrl={blockedUser.avatarUrl}
            size={ESize.small}
          />
          <span>{blockedUser.username}</span>
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
            userId={blockedUser.id}
            avatarUrl={blockedUser.avatarUrl}
            size={ESize.large}
          />
          <p>{blockedUser.username}</p>
          {adminAction && (
            <>
              <Button onClick={handleUnblockUser} danger>
                Unblock Member
              </Button>
            </>
          )}

          <Button onClick={handleCancel}>Close</Button>
        </Space>
      </Modal>
    </>
  )
}

export default ChannelBlockedProfile
