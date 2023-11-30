export async function LogUser(mail: string, password: string) {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',

      body: JSON.stringify({
        mail,
        password
      })
    })
    if (response.ok) {
      const userData = await response.json()
      window.location.href = 'http://127.0.0.1:5173' // replace with setLocation('/', { replace: true }) ?
      return userData
    }
  } catch (error) {
    throw error
  }
}
