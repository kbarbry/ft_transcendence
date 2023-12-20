import React, { useState } from 'react'
import { getToken } from './getToken'
import QRCode from 'qrcode.react'
import { useAppSelector } from '../../store/hooks'
import { useLocation } from 'wouter'
import { unset2fa } from './unset2fa'
import { validateSecret } from './validateToken'
import ErrorNotification from '../../notifications/ErrorNotificartion'
import { Button } from 'antd'

export const Settings: React.FC = () => {
  const [otpCode, setOtpCode] = useState('')
  const [otpAuthURL, setOtpAuthURL] = useState('')
  const [, setLocation] = useLocation()

  const user = useAppSelector((state) => state.userInformations.user)
  const userId = user?.id
  if (!user) throw new Error()

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

  const handleLogout = async () => {
    try {
      window.location.href =
        import.meta.env.VITE_COMPUTER_ADRESS_BACK + '/api/auth/logout'
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('userInfo')
    } catch (e) {
      console.error('Error in AppPrivate.subscription.tsx handleLogout : ', e)
      throw e
    }
  }

  return (
    <div>
      <h1>Settings</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <h2>2fa configuration</h2>
      <Button onClick={handleGetSecretClick}>Get your own QR Code!</Button>

      {otpAuthURL && (
        <div>
          <p>QR Code:</p>
          <div style={{ border: '2px solid white', display: 'inline-block' }}>
            <QRCode value={otpAuthURL} size={250} />
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
    </div>
  )
}

export default Settings
