export async function validateSecret(userId: any, token: any) {
  try {
    const response = await fetch(
      'http://z3r3p3.42lyon.fr:3000/api/auth/2fa/validate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ id: userId, token: token })
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
  } catch (error) {
    throw error
  }
}
