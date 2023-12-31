export async function getToken(userId: any) {
  try {
    const response = await fetch(
      import.meta.env.VITE_COMPUTER_ADRESS_BACK + '/api/auth/2fa/getsecret',
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
    } else if (!response.ok) {
      const errorResponse = await response.json()
      let errorMessage = errorResponse.message || 'Unknown error'
      throw new Error(errorMessage)
    }
  } catch (Error) {
    throw Error
  }
}
