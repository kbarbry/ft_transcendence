export async function verifySecret(userId : any, token : any) {
    try {
  
      console.log('INTELS =>> ' , userId, token)
      const response = await fetch(
        'http://127.0.0.1:3000/api/auth/2fa/verify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ id: userId, token : token })
        }
      )
  
      if (response.ok) {
        console.log('RESPONSE => ' , response)
        const data = await response.json()
        return data
      } else {
        return null
      }
    } catch (error) {
      throw error
    }
  }
  