import React from 'react'
import Blocked from './components/Blocked'
import { User } from '../gql/graphql'
import { Col, Divider, Empty, List, Row, Space } from 'antd'

interface BlockedsProps {
  userId: string
  blockeds: User[]
}

const Blockeds: React.FC<BlockedsProps> = React.memo(({ userId, blockeds }) => {
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
            Blocked Users
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
          {blockeds.length > 0 ? (
            <List
              dataSource={blockeds}
              renderItem={(blocked) => (
                <List.Item key={blocked.id}>
                  <Blocked blocked={blocked} userId={userId} />
                </List.Item>
              )}
            />
          ) : (
            <Empty
              image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
              imageStyle={{ height: 60 }}
              description={<span>No one blocked</span>}
            />
          )}
        </Space>
      </Col>
    </Row>
  )
})

export default Blockeds
