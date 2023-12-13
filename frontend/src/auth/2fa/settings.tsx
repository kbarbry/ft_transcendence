import React, { useState } from 'react'
import { getToken } from './getToken'
import QRCode from 'qrcode.react'
import { useAppSelector } from '../../store/hooks'
import { verifySecret } from './verifyToken'
import { useLocation } from 'wouter'
import { unset2fa } from './unset2fa'
import { validateSecret } from './validateToken'
import PopUpError from '../../ErrorPages/PopUpError'

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
        setIsError(true)
        setErrorMessage(error_message)
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
        setIsError(true)
        setErrorMessage(error_message)
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
        setIsError(true)
        setErrorMessage(error_message)
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <h1>THIS IS SETTINGS PAGE</h1>
      {isError && <PopUpError message={errorMessage} />}

      <button onClick={handleGetSecretClick}>Get your own QR Code!</button>

      {otpAuthURL && (
        <div>
          <p>QR Code:</p>
          <QRCode value={otpAuthURL} size={250} />
        </div>
      )}
      <br></br>
      <form onSubmit={handleSubmit}>
        <label htmlFor='otpCode'>Enter OTP Code:</label>
        <input
          type='text'
          id='otpCode'
          name='otpCode'
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
        />
        <button onClick={handleValidateSecretClick} type='submit'>
          Validate
        </button>
        <button onClick={handleUnset2faClick} type='submit'>
          Disable 2fa
        </button>
      </form>
    </div>
  )
}

export default Settings
