import React, { useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { queryIsUserUsernameUsed, mutationUpdateUser } from './graphql'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Form, Input, Space, Button, Select } from 'antd'
import {
  ELanguage,
  EStatus,
  UpdateUserMutation,
  UpdateUserMutationVariables
} from '../gql/graphql'
import { setUserInformations } from '../store/slices/user-informations.slice'
const { Option } = Select

const UpdateProfil: React.FC = () => {
  const user = useAppSelector((state) => state.userInformations.user)
  const dispatch = useAppDispatch()

  if (!user) throw new Error()

  const [username, setUsername] = useState<string | undefined>(undefined)
  const [languages, setLanguages] = useState<ELanguage>(user.languages)
  const [status, setStatus] = useState<EStatus>(user.status)
  const [isUsernameUsed, setIsUsernameUsed] = useState(false)

  const [checkUsernameAvailability] = useLazyQuery(queryIsUserUsernameUsed, {
    onCompleted: (data: any) => {
      setIsUsernameUsed(data.isUserUsernameUsed)
    },
    onError: () => {
      setIsUsernameUsed(false)
    }
  })

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value
    setUsername(newUsername)

    if (newUsername.trim() === '') {
      setUsername(undefined)
      setIsUsernameUsed(false)
      return
    }

    checkUsernameAvailability({
      variables: { username: newUsername },
      fetchPolicy: 'network-only'
    })
  }

  const handleStatusChange = (newStatus: EStatus) => {
    setStatus(newStatus)
  }

  const handleLanguageChange = (newLanguage: ELanguage) => {
    setLanguages(newLanguage)
  }

  const [updateUserMutation] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(mutationUpdateUser)

  const onFinishedFailed = () => {}

  const handleUpdateProfil = async () => {
    if (isUsernameUsed) return
    const { data: updateData } = await updateUserMutation({
      variables: {
        id: user?.id,
        data: {
          username: username,
          status: status ? status : undefined,
          languages: languages ? languages : undefined
        }
      }
    })
    if (updateData) {
      dispatch(setUserInformations())
    }
  }

  return (
    <Space direction='vertical'>
      <Form
        name='editUser'
        onFinishFailed={onFinishedFailed}
        onFinish={handleUpdateProfil}
      >
        <h1>Change Informations</h1>
        <Form.Item
          label='Username'
          required={false}
          name='username'
          rules={[
            {
              validator: async (_, newUsername) => {
                if (!newUsername) {
                  return Promise.resolve()
                }
                try {
                  const { data } = await checkUsernameAvailability({
                    variables: { username: newUsername },
                    fetchPolicy: 'network-only'
                  })
                  if (data.isUserUsernameUsed) {
                    throw new Error('Username already used')
                  }
                  return Promise.resolve()
                } catch (error) {
                  return Promise.reject('Username already used')
                }
              }
            }
          ]}
        >
          <Input placeholder='New username' onChange={handleUsernameChange} />
        </Form.Item>
        <Form.Item label='Status' required={false} name='status'>
          <Select onChange={handleStatusChange}>
            <Option value={EStatus.Online}>Online</Option>
            <Option value={EStatus.Invisble}>Invisible</Option>
            <Option value={EStatus.DoNotDisturb}>DoNotDisturb</Option>
            <Option value={EStatus.Idle}>Unavailable</Option>
          </Select>
        </Form.Item>
        <Form.Item label='Language' required={false} name='language'>
          <Select onChange={handleLanguageChange}>
            <Option value={ELanguage.English}>English</Option>
            <Option value={ELanguage.French}>Français</Option>
            <Option value={ELanguage.Spanish}>Español</Option>
          </Select>
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Save
        </Button>
      </Form>
    </Space>
  )
}
export default UpdateProfil
