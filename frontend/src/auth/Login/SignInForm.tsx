import React, { useState } from 'react'
import { LogUser } from './logUser'
import { useLocation } from 'wouter'
import { Form, Input, Button, Divider, Space } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons'
import FortyTwoLogo from '/42.svg'
import GithubLogo from '/github.svg'
import GoogleLogo from '/google.svg'
import ErrorNotification from '../../notifications/ErrorNotificartion'

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [, setLocation] = useLocation()

  const handleLogUserClick = () => {
    LogUser(email, pass)
      .then((userData) => {
        if (userData !== null) {
          if (userData.is2faverified === false) {
            setLocation(
              import.meta.env.VITE_COMPUTER_ADRESS_FRONT + '/2fa/login',
              {
                replace: true
              }
            )
            window.location.reload()
          } else {
            setLocation(import.meta.env.VITE_COMPUTER_ADRESS_FRONT + '/', {
              replace: true
            })
            window.location.reload()
          }
        }
      })
      .catch((error) => {
        const error_message = error.message
        ErrorNotification('Login Error', error_message)
      })
  }

  return (
    <Space direction='vertical'>
      <Form name='login'>
        <Form.Item
          name='mail'
          rules={[
            { required: true, message: 'Mail is required' },
            { type: 'email', message: 'Must be a valid email' }
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='youremail@gmail.com'
            size='large'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
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
            placeholder='password'
            size='large'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
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
            onClick={handleLogUserClick}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      <Divider>or</Divider>
      <Space direction='vertical'>
        <Button
          type='default'
          icon={
            <img
              src={FortyTwoLogo}
              alt='42'
              style={{
                width: '1.2em',
                marginRight: '0.5em',
                verticalAlign: 'middle'
              }}
            />
          }
          onClick={() => {
            window.location.href =
              import.meta.env.VITE_COMPUTER_ADRESS_BACK + '/api/auth/42/login'
          }}
          style={{ width: '100%' }}
        >
          Continue with 42
        </Button>
        <Button
          type='default'
          icon={
            <img
              src={GoogleLogo}
              alt='42'
              style={{
                width: '1.2em',
                marginRight: '0.5em',
                verticalAlign: 'middle'
              }}
            />
          }
          onClick={() => {
            window.location.href =
              import.meta.env.VITE_COMPUTER_ADRESS_BACK +
              '/api/auth/google/login'
          }}
          style={{ width: '100%' }}
        >
          Continue with Google
        </Button>
        <Button
          type='default'
          icon={
            <img
              src={GithubLogo}
              alt='42'
              style={{
                width: '1.2em',
                marginRight: '0.5em',
                verticalAlign: 'middle'
              }}
            />
          }
          onClick={() => {
            window.location.href =
              import.meta.env.VITE_COMPUTER_ADRESS_BACK +
              '/api/auth/github/login'
          }}
          style={{ width: '100%' }}
        >
          Continue with GitHub
        </Button>
      </Space>
    </Space>
  )
}

export default SignIn
