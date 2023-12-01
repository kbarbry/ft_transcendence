import { useLocation } from 'wouter'
import React, { useEffect } from 'react'

export async function LogUser(mail: string, password: string) {
  // const [, setLocation] = useLocation()
  
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
      return userData
    }
    else 
      return null
  } catch (error) {
    throw error
  }
}
