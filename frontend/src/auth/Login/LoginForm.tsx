import React, { useState } from 'react'
import { LogUser } from './logUser'
import { Link } from 'wouter'

export const Login = (props: any) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [userData, setUserData] = useState(null)

  const handleLogUserClick = () => {
    LogUser( email, pass)
      .then((userData) => {
        setUserData(userData)
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'utilisateur:", error)
      })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className='auth-form-container'>
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor='email'>email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='youremail@gmail.com'
          id='email'
          name='email'
        />
        <label htmlFor='password'>password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type='password'
          placeholder='********'
          id='password'
          name='password'
        />
        <button onClick={handleLogUserClick}>Login</button>
      </form>
      <p>Don't have an account yet ?</p>
      <Link href='/signup'>
        <a>Signup Here </a>
      </Link>
    </div>
  )
}
