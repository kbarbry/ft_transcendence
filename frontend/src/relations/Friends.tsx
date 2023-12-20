import React from 'react'
import Friend from './components/Friend'
import { User } from '../gql/graphql'
import { Col, Divider, Empty, List, Row, Space } from 'antd'

interface FriendsProps {
  userId: string
  friends: User[]
}

const Friends: React.FC<FriendsProps> = React.memo(({ userId, friends }) => {
  return (
    <Row gutter={[16, 16]} style={{ height: '100%', width: '100%' }}>
      <Col span={24} style={{ height: '100%', overflowY: 'auto' }}>
        <Space
          direction='vertical'
          style={{ width: '100%' }}
          className='unselectable'
        >
          <h2
            style={{
              marginBottom: '0px',
              textAlign: 'center'
            }}
          >
            Friends
          </h2>
          <Divider
            style={{ height: '10px', margin: '0px', marginTop: '10px' }}
          />
        </Space>
        <Space
          style={{
            height: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {friends.length > 0 ? (
            <List
              dataSource={friends}
              renderItem={(friend) => (
                <List.Item key={friend.id}>
                  <Friend friend={friend} userId={userId} />
                </List.Item>
              )}
            />
          ) : (
            <Empty
              image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
              imageStyle={{ height: 60 }}
              description={<span>No friend</span>}
            />
          )}
        </Space>
      </Col>
    </Row>
  )
})

export default Friends
