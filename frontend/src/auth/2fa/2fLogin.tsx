import React, { useState } from 'react'
import { verifySecret } from './verifyToken'
import { getId } from '../graphql'
import { GetIdQuery, GetIdQueryVariables } from '../../gql/graphql'
import { client } from '../../main'
import { useLocation } from 'wouter'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import { Button, Col, Divider, Row, Space } from 'antd'

export const validation2fa: React.FC = () => {
  const [otpCode, setOtpCode] = useState('')
  const [, setLocation] = useLocation()

  const handleVerifySecretClick = async () => {
    const { data: dataGetId } = await client.query<
      GetIdQuery,
      GetIdQueryVariables
    >({ query: getId })

    const userId = dataGetId.findOneUserByContext.id
    verifySecret(userId, otpCode)
      .then((validation) => {
        if (validation) {
          setLocation('http://127.0.0.1:5173', { replace: true })
          window.location.reload()
        }
      })
      .catch((error) => {
        const error_message = error.message
        ErrorNotification('2fa error', error_message)
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleVerifySecretClick()
  }

  return (
    <Row
      gutter={[16, 16]}
      style={{ height: '100%', width: '100%', color: 'white' }}
      className='unselectable'
    >
      <Col span={24} style={{ height: '100%', width: '100%' }}>
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
            Validate 2FA
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
          <form onSubmit={handleSubmit}>
            <label htmlFor='otpCode'>Enter OTP Code:</label>
            <input
              type='text'
              id='otpCode'
              name='otpCode'
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
            <Button type='submit'>Validate</Button>
          </form>
        </Space>
      </Col>
    </Row>
  )
}

export default validation2fa
