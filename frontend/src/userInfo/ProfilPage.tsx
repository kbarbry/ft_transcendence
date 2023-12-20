import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { Col, Divider, Menu, MenuProps, Row, Space } from 'antd'
import Settings from '../auth/2fa/settings'
import { UserOutlined } from '@ant-design/icons'
import { MdOutlineSecurity } from 'react-icons/md'
import UserInformations from './components/UserInformations'
import { ImExit } from 'react-icons/im'

export const ProfilPage: React.FC = () => {
  const user = useAppSelector((state) => state.userInformations.user)
  const [selectedItem, setSelectedItem] = useState<string>('UserInformations')

  if (!user) throw new Error()

  const items: MenuProps['items'] = [
    {
      label: 'User Informations',
      icon: <UserOutlined />,
      key: 'UserInformations'
    },
    {
      label: '2FA',
      icon: <MdOutlineSecurity />,
      key: '2fa'
    },
    {
      label: 'Logout',
      icon: <ImExit />,
      key: 'logout'
    }
  ]

  const handleLogout = async () => {
    try {
      window.location.href = 'http://127.0.0.1:3000/api/auth/logout'
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('userInfo')
    } catch (e) {
      console.error('Error in AppPrivate.subscription.tsx handleLogout : ', e)
      throw e
    }
  }

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
    if (item === 'logout') handleLogout()
  }

  return (
    <Row
      gutter={[16, 16]}
      style={{ height: '100%', width: '100%' }}
      className='unselectable'
    >
      <Col span={6} style={{ height: '100%', width: '100%' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <h2
            style={{
              marginBottom: '0px',
              textAlign: 'center'
            }}
          >
            User Informations
          </h2>
          <Divider
            style={{ height: '10px', margin: '0px', marginTop: '10px' }}
          />
          <Menu
            mode='vertical'
            style={{ backgroundColor: '#242424', borderRight: 'none' }}
            defaultSelectedKeys={['UserInformations']}
            items={items}
            onClick={(item) => handleItemClick(item.key as string)}
          />
        </Space>
      </Col>
      <Col span={1} style={{ height: '100%' }}>
        <Divider
          type='vertical'
          style={{ height: '100%', marginLeft: '50%' }}
        />
      </Col>
      <Col
        span={17}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {selectedItem === 'UserInformations' && (
          <UserInformations key='friends' user={user} />
        )}
        {selectedItem === '2fa' && <Settings />}
      </Col>
    </Row>
  )
}
