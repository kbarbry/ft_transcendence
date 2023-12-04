import React, { useState } from 'react'
import { Tabs, Card, TabsProps } from 'antd'
import SignIn from './Login/SignInForm'
import SignUp from './Signup/SignUpForm'

const Auth: React.FC = () => {
  const [, setActiveTab] = useState('SignIn')

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  const items: TabsProps['items'] = [
    { key: '1', label: 'SignIn', children: <SignIn /> },
    { key: '2', label: 'SignUp', children: <SignUp /> }
  ]

  return (
    <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2>Transcendence</h2>
      <br />
      <Tabs
        type='line'
        centered
        items={items}
        defaultActiveKey='1'
        onChange={handleTabChange}
      />
    </Card>
  )
}

export default Auth
