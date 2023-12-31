export async function createUser(
  username: string,
  mail: string,
  password: string,
  avatarUrl: string | undefined
) {
  try {
    const response = await fetch(
      import.meta.env.VITE_COMPUTER_ADRESS_BACK + '/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          mail,
          password,
          avatarUrl
        })
      }
    )

    if (response.ok) {
      const userData = await response.json()
      return userData
    } else if (!response.ok) {
      const errorResponse = await response.json()
      let errorMessage = errorResponse.message || 'Unknown error'
      throw new Error(errorMessage)
    }
  } catch (error) {
    throw error
  }
}
