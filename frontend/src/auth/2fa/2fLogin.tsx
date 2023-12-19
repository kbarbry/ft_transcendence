import React, { useState } from 'react'
import { verifySecret } from './verifyToken'
import { getId } from '../graphql'
import { GetIdQuery, GetIdQueryVariables } from '../../gql/graphql'
import { client } from '../../main'
import { useLocation } from 'wouter'
import ErrorNotification from '../../notifications/ErrorNotificartion'

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
    <div>

      <h1>Settings Page</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='otpCode'>Enter OTP Code:</label>
        <input
          type='text'
          id='otpCode'
          name='otpCode'
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
        />
        <button type='submit'>Validate</button>
      </form>
    </div>
  )
}

export default validation2fa
