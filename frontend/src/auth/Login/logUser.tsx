export async function LogUser(mail: string, password: string) {
  if (!mail || !password) {
    throw new Error('Empty mail/password')
  }
  try {
    const response = await fetch(
      import.meta.env.VITE_COMPUTER_ADRESS_BACK + '/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',

        body: JSON.stringify({
          mail,
          password
        })
      }
    )

    if (!response.ok) {
      const errorResponse = await response.json()
      const errorMessage = errorResponse.message || 'Unknown error'
      throw new Error(errorMessage)
    }
    const userData = await response.json()
    return userData
  } catch (Error) {
    throw Error
  }
}
