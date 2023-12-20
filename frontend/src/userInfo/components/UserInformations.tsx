import React, { useState } from 'react'
import {
  ELanguage,
  EStatus,
  IsUserUsernameUsedQuery,
  IsUserUsernameUsedQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User
} from '../../gql/graphql'
import AvatarStatus, { ESize } from '../../common/avatarStatus'
import {
  Divider,
  Input,
  Select,
  Space,
  SelectProps,
  Button,
  Dropdown,
  MenuProps
} from 'antd'
import {
  EditOutlined,
  SaveOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { mutationUpdateUser, queryIsUserUsernameUsed } from '../graphql'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import { useAppDispatch } from '../../store/hooks'
import { setUserInformations } from '../../store/slices/user-informations.slice'
import { client } from '../../main'

interface UserInformationsProps {
  user: User
}

const options: SelectProps['options'] = [
  { label: 'English', value: ELanguage.English },
  { label: 'Français', value: ELanguage.French },
  { label: 'Español', value: ELanguage.Spanish }
]

const UserInformations: React.FC<UserInformationsProps> = ({ user }) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<{
    username: string
    languages: ELanguage
  }>({ username: user.username, languages: user.languages })

  const [updateUserMutation] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(mutationUpdateUser)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    try {
      if (
        editedUser.username.trim() === user.username &&
        editedUser.languages === user.username
      )
        return
      const usernameUsedRes = await client.query<
        IsUserUsernameUsedQuery,
        IsUserUsernameUsedQueryVariables
      >({
        query: queryIsUserUsernameUsed,
        variables: { username: editedUser.username }
      })
      const usernameUsed = usernameUsedRes.data.isUserUsernameUsed
      if (editedUser.username.trim() !== user.username && usernameUsed === true)
        throw new Error('Username already used')

      await updateUserMutation({
        variables: {
          data: {
            username:
              editedUser.username.trim() === user.username
                ? undefined
                : editedUser.username,
            languages:
              editedUser.languages === user.username
                ? undefined
                : editedUser.languages
          },
          id: user.id
        }
      })

      setIsEditing(false)
    } catch (Error) {
      let error_message = (Error as Error).message
      ErrorNotification('Error', error_message)
    }
  }

  const handleCancelClick = () => {
    setEditedUser({ ...user })
    setIsEditing(false)
  }

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    try {
      let value: EStatus
      if (key == EStatus.Idle) value = EStatus.Idle
      else if (key == EStatus.DoNotDisturb) value = EStatus.DoNotDisturb
      else if (key == EStatus.Invisble) value = EStatus.Invisble
      else value = EStatus.Online
      await updateUserMutation({
        variables: {
          data: { status: value },
          id: user.id
        }
      })
      dispatch(setUserInformations())
    } catch (Error) {
      let error_message = (Error as Error).message
      ErrorNotification('Error', error_message)
    }
  }

  const items: MenuProps['items'] = [
    {
      label: 'Online',
      key: EStatus.Online
    },
    {
      label: 'Idle',
      key: EStatus.Idle
    },
    {
      label: 'Do Not Disturb',
      key: EStatus.DoNotDisturb
    },
    {
      label: 'Invisible',
      key: EStatus.Invisble
    }
  ]

  return (
    <Space
      direction='vertical'
      style={{
        border: '1px solid #555',
        padding: '16px',
        borderRadius: '4px',
        minWidth: '300px',
        textAlign: 'center'
      }}
    >
      <div style={{ marginTop: '-93px', marginBottom: '10px' }}>
        <Dropdown
          arrow
          menu={{ items, onClick }}
          placement='bottom'
          trigger={['click']}
        >
          <Button
            type='text'
            style={{ padding: 0, border: 'none', height: '100%' }}
          >
            <AvatarStatus
              avatarUrl={user.avatarUrl}
              size={ESize.large}
              userId={user.id}
            />
          </Button>
        </Dropdown>
        <div style={{ marginTop: '-10px', marginLeft: '200px' }}>
          {isEditing === false && (
            <Button icon={<EditOutlined />} onClick={handleEditClick} />
          )}
          {isEditing && (
            <>
              <Button icon={<SaveOutlined />} onClick={handleSaveClick} />
              <Button
                icon={<CloseCircleOutlined />}
                onClick={handleCancelClick}
              />
            </>
          )}
        </div>
      </div>

      <Divider
        plain
        style={{
          height: '10px',
          margin: '0px',
          marginTop: '10px',
          color: '#777'
        }}
      >
        Mail
      </Divider>
      <p>{user.mail}</p>
      <Divider
        plain
        style={{
          height: '10px',
          margin: '0px',
          marginTop: '10px',
          color: '#777'
        }}
      >
        Username
      </Divider>
      {isEditing ? (
        <Input
          value={editedUser.username}
          onChange={(e) =>
            setEditedUser({ ...editedUser, username: e.target.value })
          }
          style={{ marginTop: '10px' }}
        />
      ) : (
        <p>{editedUser.username}</p>
      )}

      <Divider
        plain
        style={{
          height: '10px',
          margin: '0px',
          marginTop: '10px',
          color: '#777'
        }}
      >
        Language
      </Divider>
      {isEditing ? (
        <Select
          value={editedUser.languages}
          onChange={(value) =>
            setEditedUser({ ...editedUser, languages: value as ELanguage })
          }
          style={{ marginTop: '10px', marginBottom: '10px' }}
          options={options}
        />
      ) : (
        <p>{editedUser.languages}</p>
      )}
      <Divider
        plain
        style={{
          height: '10px',
          margin: '0px',
          marginTop: '10px',
          color: '#777'
        }}
      >
        Level
      </Divider>
      <p>{user.level.toFixed(1)}</p>
    </Space>
  )
}

export default UserInformations
