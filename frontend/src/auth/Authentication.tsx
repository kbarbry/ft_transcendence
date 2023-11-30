import React from 'react'
import { Link } from 'wouter'

export const Authentication: React.FC = () => {
  return (
    <div>
      <h2>Auth page</h2>
      <br />
      <Link href='/login'>
        <a>Local Login</a>
      </Link>
      <br></br>
      <Link href='/signup'>
        <a>Local Signup</a>
      </Link>
      <br />

      <a href='http://localhost:3000/api/auth/42/login'>42Login</a>
      <br></br>
      <a href='http://localhost:3000/api/auth/google/login'>GoogleLogin</a>
      <br></br>
      <a href='http://localhost:3000/api/auth/github/login'>GithubLogin</a>
    </div>
  )
}

export default Authentication
