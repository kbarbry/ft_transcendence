import React, { useState } from 'react'
import { verifySecret } from './verifyToken'
import { getId } from '../graphql'
import { GetIdQuery, GetIdQueryVariables } from '../../gql/graphql'
import { client } from '../../main'
import { useLocation } from 'wouter'
import PopUpError from '../../ErrorPages/PopUpError'

export const validation2fa: React.FC = () => {
  const [otpCode, setOtpCode] = useState('')
  const [, setLocation] = useLocation()
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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
        setIsError(true)
        setErrorMessage(error_message)
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleVerifySecretClick()
  }

  return (
    <div>
      {isError && <PopUpError message={errorMessage} />}

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
