export async function createUser(
  username: string,
  mail: string,
  password: string,
  avatarUrl: string | undefined
) {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/auth/signup', {
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
    })

    if (response.ok) {
      const userData = await response.json()
      return userData
    } else return null
  } catch (error) {
    throw error
  }
}
