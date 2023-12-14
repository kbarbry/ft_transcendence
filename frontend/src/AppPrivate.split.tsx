import React, { useState } from 'react'
import AppPrivateSubscription from './AppPrivate.subscription'
import PrivateChannel from './chat/PrivateChannels'
import Relations from './relations/Relations'
import Channels from './chat/Channels'
import { Link, Route, Switch } from 'wouter'
import { Settings } from './auth/2fa/settings'
import { NotFound } from './ErrorPages/404'
import { Home } from './home/Home'
import { Layout, Menu, MenuProps } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { PiGameControllerDuotone } from 'react-icons/pi'
import {
  SettingOutlined,
  HomeOutlined,
  MessageOutlined,
  GlobalOutlined,
  TeamOutlined
} from '@ant-design/icons'

interface AppPrivateSubscriptionProps {
  userId: string
}

interface ISubscriptionDone {
  done: boolean
  error: boolean
}

const AppPrivateSplit: React.FC<AppPrivateSubscriptionProps> = ({ userId }) => {
  const [subscriptionsDone, setSubscriptionsDone] = useState<ISubscriptionDone>(
    {
      done: false,
      error: false
    }
  )

  const items: MenuProps['items'] = [
    {
      label: (
        <Link href='/'>
          <a>Home</a>
        </Link>
      ),
      icon: <HomeOutlined />,
      key: 'home'
    },
    {
      label: (
        <Link href='/game'>
          <a>Game</a>
        </Link>
      ),
      icon: <PiGameControllerDuotone />,
      key: 'game'
    },
    {
      label: (
        <Link href='/privateChannel'>
          <a>Private Messages</a>
        </Link>
      ),
      icon: <MessageOutlined />,
      key: 'privateChannel'
    },
    {
      label: (
        <Link href='/channel'>
          <a>Channels</a>
        </Link>
      ),
      icon: <GlobalOutlined />,
      key: 'channel'
    },
    {
      label: (
        <Link href='/relations'>
          <a>Friends</a>
        </Link>
      ),
      icon: <TeamOutlined />,
      key: 'relations'
    },
    {
      label: (
        <Link href='/settings'>
          <a>Settings</a>
        </Link>
      ),
      icon: <SettingOutlined />,
      key: 'settings'
    }
  ]

  if (subscriptionsDone.error) return <p>Error... Subscriptions</p>

  return (
    <Layout style={{ height: '100%', maxHeight: '100%' }}>
      <Header
        className='unselectable'
        style={{
          position: 'fixed',
          width: '100%',
          padding: 0,
          zIndex: 1,
          background: '#001529'
        }}
      >
        <Menu
          mode='horizontal'
          selectedKeys={['/']}
          defaultSelectedKeys={['/']}
          items={items}
          style={{
            width: '100%',
            padding: 0,
            display: 'flex',
            justifyContent: 'center'
          }}
        />
      </Header>
      <Content
        style={{
          background: '#242424',
          position: 'fixed',
          top: '50px',
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'auto'
        }}
      >
        <div
          style={{
            background: '#242424',
            color: '#fff',
            padding: 24,
            height: '100%'
          }}
        >
          <div>
            <AppPrivateSubscription
              userId={userId}
              setSubscriptionsDone={setSubscriptionsDone}
              key={userId}
            />
          </div>
          {subscriptionsDone.done && (
            <div
              style={{
                height: '100%'
              }}
            >
              <Switch>
                <Route path='/' component={Home} />
                <Route path='/privateChannel' component={PrivateChannel} />
                <Route path='/channel' component={Channels} />
                <Route path='/relations' component={Relations} />
                <Route path='/game' component={Settings} />
                <Route path='/settings' component={Settings} />
                <Route component={NotFound} />
              </Switch>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  )
}

export default AppPrivateSplit
