import React from 'react'
import RequestReceived from './components/RequestReceived'
import { User } from '../gql/graphql'
import { Col, Divider, Empty, List, Row, Space } from 'antd'

interface RequestsReceivedProps {
  userId: string
  requestsReceived: User[]
}

const RequestsReceived: React.FC<RequestsReceivedProps> = React.memo(
  ({ userId, requestsReceived }) => {
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
              Requests Received
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
            {requestsReceived.length > 0 ? (
              <List
                dataSource={requestsReceived}
                renderItem={(requestReceived) => (
                  <List.Item key={requestReceived.id}>
                    <RequestReceived
                      requestReceived={requestReceived}
                      userId={userId}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty
                image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                imageStyle={{ height: 60 }}
                description={<span>No request received</span>}
              />
            )}
          </Space>
        </Col>
      </Row>
    )
  }
)

export default RequestsReceived
