import React, { useState } from 'react'
import { getToken } from './getToken'
import QRCode from 'qrcode.react'
import { useAppSelector } from '../../store/hooks'
import { useLocation } from 'wouter'
import { unset2fa } from './unset2fa'
import { validateSecret } from './validateToken'
import ErrorNotification from '../../notifications/ErrorNotificartion'

export const Settings: React.FC = () => {
  const [otpCode, setOtpCode] = useState('')
  const [otpAuthURL, setOtpAuthURL] = useState('')
  const [, setLocation] = useLocation()
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
          setLocation('http://127.0.0.1:5173', { replace: true })
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
          setLocation('http://127.0.0.1:5173', { replace: true })
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
      window.location.href = 'http://127.0.0.1:3000/api/auth/logout'
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('userInfo')
    } catch (e) {
      console.error('Error in AppPrivate.subscription.tsx handleLogout : ', e)
      throw e
    }
  }

  return (
    <div>
      <h1>THIS IS SETTINGS PAGE</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleGetSecretClick}>Get your own QR Code!</button>

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
