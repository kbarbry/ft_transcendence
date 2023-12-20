import React from 'react'
import RequestSent from './components/RequestSent'
import { User } from '../gql/graphql'
import { Col, Divider, Empty, List, Row, Space } from 'antd'

interface RequestsSentProps {
  userId: string
  requestsSent: User[]
}

const RequestsSent: React.FC<RequestsSentProps> = React.memo(
  ({ userId, requestsSent }) => {
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
              Requests Sent
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
            {requestsSent.length > 0 ? (
              <List
                dataSource={requestsSent}
                renderItem={(requestSent) => (
                  <List.Item key={requestSent.id}>
                    <RequestSent requestSent={requestSent} userId={userId} />
                  </List.Item>
                )}
              />
            ) : (
              <Empty
                image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                imageStyle={{ height: 60 }}
                description={<span>No request sent</span>}
              />
            )}
          </Space>
        </Col>
      </Row>
    )
  }
)

export default RequestsSent
