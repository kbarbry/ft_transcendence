import React, { useState } from 'react'
import { verifySecret } from './verifyToken'
import { useAppSelector } from '../../store/hooks'
import { getId } from '../graphql'
import { useQuery } from '@apollo/client'
import { GetIdQuery, GetIdQueryVariables } from '../../gql/graphql'
import { client } from '../../main'

export const validation2fa: React.FC = () => {
  const [otpCode, setOtpCode] = useState('')

  /*
Je veux recevoir l'id de mon user par la requete ici
*/


const handleVerifySecretClick = async () => {
    try {
        const {data: dataGetId} = await client.query<GetIdQuery, GetIdQueryVariables>({query: getId})
        
        const userId = dataGetId.findOneUserByContext.id
        console.log('2flogin ==> ', userId)

      const response = await verifySecret(userId, otpCode)
      console.log('response => ', response)
      window.location.reload()
    } catch (error) {
      console.error('Erreur lors de la vérification du secret:', error)
    }
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
