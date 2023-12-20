import React, { useState } from 'react'
import { getToken } from './getToken'
import { useAppSelector } from '../../store/hooks'
import { useLocation } from 'wouter'
import { unset2fa } from './unset2fa'
import { validateSecret } from './validateToken'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import { Button, Col, Divider, Row, Space, QRCode } from 'antd'
import TransPicture from '/transcendence.png'

export const Settings: React.FC = () => {
  const [otpCode, setOtpCode] = useState('')
  const [otpAuthURL, setOtpAuthURL] = useState('')
  const [, setLocation] = useLocation()

  const user = useAppSelector((state) => state.userInformations.user)
  const userId = user?.id
  if (!user) throw new Error()

  console.log(user.validation2fa)

  const handleGetSecretClick = () => {
    getToken(userId)
      .then((response) => {
        if (response && response.base32) {
          const otpAuthURL = response.otpauth_url
          setOtpAuthURL(otpAuthURL)
        }
      })
      .catch((error) => {
        const error_message = error.message
        ErrorNotification('2fa Error', error_message)
      })
  }

  const handleValidateSecretClick = () => {
    validateSecret(userId, otpCode)
      .then((isVerified) => {
        if (isVerified) {
          setLocation('/', { replace: true })
        }
      })
      .catch((error) => {
        const error_message = error.message
        ErrorNotification('2fa Error', error_message)
      })
  }

  const handleUnset2faClick = () => {
    unset2fa(userId, otpCode)
      .then((isVerified) => {
        if (isVerified) {
          setLocation('/', { replace: true })
        }
      })
      .catch((error) => {
        const error_message = error.message
        ErrorNotification('2fa Error', error_message)
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

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
            2FA Pannel
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
          <Button onClick={handleGetSecretClick}>Get your own QR Code!</Button>

          {otpAuthURL && (
            <div>
              <p>QR Code:</p>
              <div
                style={{ border: '2px solid white', display: 'inline-block' }}
              >
                <QRCode value={otpAuthURL} size={250} icon={TransPicture} />
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor='otpCode'>Enter OTP Code:</label>
            <input
              type='text'
              id='otpCode'
              name='otpCode'
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
            <Button onClick={handleValidateSecretClick} htmlType='submit'>
              Validate
            </Button>
            <Button onClick={handleUnset2faClick} htmlType='submit'>
              Disable 2fa
            </Button>
          </form>
        </Space>
      </Col>
    </Row>
  )
}

export default Settings
