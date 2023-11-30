export async function createUser(
  username: string,
  mail: string,
  password: string
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
        password
      })
    })

    if (response.ok) {
      const userData = await response.json()
      window.location.href = 'http://127.0.0.1:5173/login'
      return userData
    }
  } catch (error) {
    throw error
  }
}
