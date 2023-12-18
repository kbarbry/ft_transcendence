import React, { useState } from 'react'
import { createUser } from './createUser'
import { Button, Form, Input, Space, TabsProps } from 'antd'
import SignIn from '../Login/SignInForm'
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons'
import { queryIsUserMailUsed, queryIsUserUsernameUsed } from '../graphql'
import { useLazyQuery } from '@apollo/client'
import PopUpError from '../../ErrorPages/PopUpError'
import SuccessNotification from '../../notifications/SuccessNotification'
// import { PROFILE_PICTURE_URL } from '../../store/slices/user-informations.slice'

interface SignUpProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const SignUp: React.FC<SignUpProps> = ({setActiveTab}) => {
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [username, setUsername] = useState('')
  const [, setUserData] = useState(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isUsernameUsed, setIsUsernameUsed] = useState(false)
  const [isMailUsed, setIsMailUsed] = useState(false)
  const [isError, setIsError] = useState(false) // State for tracking errors
  const [errorMessage, setErrorMessage] = useState('') // State for error message


  // const [avatarUrl, setAvatarUrl] = useState('')
  // const [isValidAvatarUrl, setIsValidAvatarUrl] = useState(false)
  // const [avatarLoading, setAvatarLoading] = useState(false)

  const [checkUsernameAvailability] = useLazyQuery(queryIsUserUsernameUsed, {
    onCompleted: (data: any) => {
      setIsUsernameUsed(data.isUserUsernameUsed)
      setIsButtonDisabled(false)
    },
    onError: () => {
      setIsUsernameUsed(false)
      setIsButtonDisabled(false)
    }
  })

  const [checkMailAvailability] = useLazyQuery(queryIsUserMailUsed, {
    onCompleted: (data: any) => {
      setIsMailUsed(data.isUserMailUsed)
      setIsButtonDisabled(false)
    },
    onError: () => {
      setIsMailUsed(false)
      setIsButtonDisabled(false)
    }
  })
  
  // const handleAvatarUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newAvatarUrl = e.target.value
  //   setAvatarUrl(newAvatarUrl)

  //   if (newAvatarUrl.trim() === '') {
  //     setIsValidAvatarUrl(false)
  //     setAvatarLoading(false)
  //     return
  //   }
  //   setAvatarLoading(true)
  //   fetch(newAvatarUrl)
  //     .then((response) => {
  //       const contentType = response.headers.get('Content-Type')

  //       if (response.ok && contentType && contentType.startsWith('image/')) {
  //         setIsValidAvatarUrl(true)
  //         setAvatarLoading(false)
  //       } else {
  //         setIsValidAvatarUrl(false)
  //         setAvatarLoading(false)
  //       }
  //     })
  //     .catch(() => {
  //       setIsValidAvatarUrl(false)
  //       setAvatarLoading(false)
  //     })
  // }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value
    setUsername(newUsername)

    if (newUsername.trim() === '') {
      setIsUsernameUsed(false)
      return
    }

    setIsButtonDisabled(false)
    checkUsernameAvailability({
      variables: { username: newUsername }
    })
  }

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMail = e.target.value
    setMail(newMail)

    if (newMail.trim() === '') {
      setIsMailUsed(false)
      return
    }

    setIsButtonDisabled(true)
    checkMailAvailability({
      variables: { mail: newMail }
    })
  }

  const onFinishedFailed = () => {}

  const handleCreateUserClick = () => {
    if (isMailUsed || isUsernameUsed) return
    const validAvatarUrl = undefined
    // const validAvatarUrl = isValidAvatarUrl ? avatarUrl : undefined
    createUser(username, mail, pass, validAvatarUrl)
      .then((userData) => {
        setUserData(userData)
        if (userData !== null) {
          SuccessNotification('SignIn', 'You are nw registred, please LogIn')
          setTimeout(() => {  window.location.reload() }, 2000);
        }
      })
      .catch((error) => {
        const error_message = error.message
        setIsError(true)
        setErrorMessage(error_message)
      })
  }

  return (
    <Space direction='vertical'>
      {isError && <PopUpError message={errorMessage} />}
      <Form
        name='signup'
        onFinishFailed={onFinishedFailed}
        onFinish={handleCreateUserClick}
      >
        {/* {avatarLoading && (
          <Space size='middle' style={{ maxWidth: '100%', height: '7em' }}>
            <Spin />
          </Space>
        )} */}
        {/* {!avatarLoading && isValidAvatarUrl && (
          <img
            src={avatarUrl}
            alt='Avatar Preview'
            style={{ maxWidth: '100%', maxHeight: '7em' }}
          />
        )} */}
        {/* {!avatarLoading && !isValidAvatarUrl && (
          <img
            src={PROFILE_PICTURE_URL}
            alt='Avatar Preview'
            style={{ maxWidth: '100%', maxHeight: '7em' }}
          />
        )} */}
        {/* <Form.Item name='avatarUrl' label='Avatar URL' required={false}>
          <Input
            placeholder='https://example.com/avatar.jpg'
            value={avatarUrl}
            onChange={handleAvatarUrlChange}
          />
        </Form.Item> */}
        <Form.Item
          label='Email'
          required={true}
          name='email'
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Must be a valid email' },
            {
              validator: (_) => {
                if (isMailUsed) {
                  return Promise.reject('Mail already used')
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='youremail@gmail.com'
            value={mail}
            onChange={handleMailChange}
          />
        </Form.Item>
        <Form.Item
          label='Username'
          required={true}
          name='username'
          rules={[
            { required: true, message: 'Username is required' },
            {
              type: 'string',
              message: 'Username must be a string'
            },
            {
              min: 1,
              max: 30,
              message: 'Username must be between 1 and 30 characters long'
            },
            {
              pattern: /^[a-zA-Z0-9_\-\.]+( [a-zA-Z0-9_\-\.]+)?$/,
              message:
                'Username can only contain letters, numbers, single spaces, and "_-."'
            },
            {
              validator: (_) => {
                if (isUsernameUsed) {
                  return Promise.reject('Username already used')
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='John Doe'
            count={{
              show: true,
              max: 30
            }}
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Item>
        <Form.Item
          label='Password'
          required={true}
          name='password'
          rules={[
            { required: true, message: 'Password is required' },
            {
              min: 8,
              message: 'Password must be at least 8 characters long'
            },
            {
              max: 50,
              message: 'Password cannot be more than 50 characters long'
            },
            {
              validator: (_, value) => {
                if (!/(?=.*[a-z])/.test(value)) {
                  return Promise.reject(
                    'Password must contain at least one lowercase letter'
                  )
                }
                if (!/(?=.*[A-Z])/.test(value)) {
                  return Promise.reject(
                    'Password must contain at least one uppercase letter'
                  )
                }
                if (!/(?=.*\d)/.test(value)) {
                  return Promise.reject(
                    'Password must contain at least one number'
                  )
                }
                if (!/(?=.*[!@#$%^&+=])/.test(value)) {
                  return Promise.reject(
                    'Password must contain at least one special character between ()!@#$%^&+='
                  )
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password59!'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          label='Confirm Password'
          required={true}
          name='confirmPassword'
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('The two passwords do not match')
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password59!'
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            block
            disabled={isButtonDisabled}
          >
            Create account
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}

export default SignUp
