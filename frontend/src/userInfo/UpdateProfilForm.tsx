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
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userInformations.user)

  if (!user) throw new Error()

  const [username, setUsername] = useState('')
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
      setIsUsernameUsed(false)
      return
    }

    checkUsernameAvailability({
      variables: { username: newUsername }
    })
  }

  const handleStatusChange = (newStatus: EStatus) => {
    console.log('IN STATUS CHANGE ==>', newStatus)
    setStatus(newStatus)
  }

  const handleLanguageChange = (newLanguage: ELanguage) => {
    console.log('IN LANGUAGE CHANGE ==>', newLanguage)

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
        <Form.Item
          label='Username'
          required={false}
          name='username'
          rules={[
            {
              validator: async () => {
                if (isUsernameUsed) {
                  return Promise.reject('Username already used')
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <Input placeholder='New username' onChange={handleUsernameChange} />
        </Form.Item>

        <Form.Item label='Status' required={false} name='status'>
          <Select onChange={(value: EStatus) => handleStatusChange(value)}>
            <Option value={EStatus.Online}>Online</Option>
            <Option value={EStatus.Invisble}>Invisible</Option>
            <Option value={EStatus.DoNotDisturb}>DoNotDisturb</Option>
            <Option value={EStatus.Idle}>Idle</Option>
          </Select>
        </Form.Item>

        <Form.Item label='Language' required={false} name='language'>
          <Select onChange={handleLanguageChange}>
            <Option value='English'>English</Option>
            <Option value='French'>French</Option>
            <Option value='Spanish'>Spanish</Option>
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
