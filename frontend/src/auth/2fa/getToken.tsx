export async function authSecret(userId : any) {
  try {

    const response = await fetch(
      'http://127.0.0.1:3000/api/auth/2fa/getsecret',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ id: userId })
      }
    )

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      return null
    }
  } catch (error) {
    throw error
  }
}
