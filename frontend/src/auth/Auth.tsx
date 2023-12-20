import React, { useState } from 'react'
import { Tabs, Card, TabsProps } from 'antd'
import SignIn from './Login/SignInForm'
import SignUp from './Signup/SignupForm'

const Auth: React.FC = () => {
  const [, setActiveTab] = useState('SignIn')
  

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  const items: TabsProps['items'] = [
    { key: '1', label: 'SignIn', children: <SignIn /> },
    { key: '2', label: 'SignUp', children: <SignUp /> },
  ]

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <Card
        style={{
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)',
          width: '400px',
          maxWidth: '400px',
          textAlign: 'center'
        }}
      >
        <h2>Ft_Transcendence</h2>
        Welcome to this very tedious project, we are very proud to introduce you
        to our transcendence !
        <br />
        <br />
        <Tabs
          type='line'
          centered
          items={items}
          defaultActiveKey='1'
          onChange={handleTabChange}
        />
        <br />
      </Card>
    </div>
  )
}

export default Auth
