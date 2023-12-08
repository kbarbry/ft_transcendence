import React, { useState } from 'react'
import { authSecret } from './getToken'
import QRCode from 'qrcode.react'
import { useAppSelector } from '../../store/hooks'
import { verifySecret } from './verifyToken'

export const Settings: React.FC = () => {
  const [otpCode, setOtpCode] = useState('')
  const [otpAuthURL, setOtpAuthURL] = useState('')


  const user = useAppSelector((state) => state.userInformations.user)
  const userId = user?.id
  // if (!user) throw new Error()

  const handleGetSecretClick = async () => {
    try {
      const response = await authSecret(userId)
      console.log('response => ', response)
      if (response && response.base32) {
        const otpAuthURL = response.otpauth_url
        setOtpAuthURL(otpAuthURL)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du secret:', error)
    }
  }

  const handleVerifySecretClick = async () => {
    try {
      const response = await verifySecret(userId, otpCode)
      console.log('response => ', response)
    } catch (error) {
      console.error('Erreur lors de la récupération du secret:', error)
    }
  }

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleValidateClick(otpCode)
  }

  const handleValidateClick = (code: string) => {
    console.log('Code OTP à valider:', code)
  }

  return (
    <div>
      <h1>THIS IS SETTINGS PAGE</h1>
      <button onClick={handleGetSecretClick}>Get Secret and QR Code</button>

      {otpAuthURL && (
        <div>
          <p>QR Code:</p>
          <QRCode value={otpAuthURL} size={200} />
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
        <button  onClick={handleVerifySecretClick} type='submit'>Validate</button>
      </form>
    </div>
  )
}

export default Settings
