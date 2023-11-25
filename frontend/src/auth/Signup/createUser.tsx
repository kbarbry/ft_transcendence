export async function createUser(
  username: string,
  mail: string,
  password: string
) {
  try {
    console.log('Create called 1 : ', mail)
    const response = await fetch('http://127.0.0.1:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
        mail,
        password
      })
    })
    console.log('Create called 2')

    if (response.ok) {
      const userData = await response.json()
      console.log(response.headers)
      return userData
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur2", error)
    throw error
  }
}
