import React, { useState } from 'react';
import { LogUser } from './Login/logUser';
import { Link, useLocation } from 'wouter';

export const Authentication: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [, setUserData] = useState(null);
  const [, setLocation] = useLocation(); // Ajoutez useLocation ici

  const handleLogUserClick = () => {
    LogUser(email, pass)
      .then((userData) => {
        if (userData !== null) {
          setLocation('http://127.0.0.1:5173', { replace: true });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'utilisateur:", error);
      });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  
  return (
    <div>
      <h1>Auth page</h1>
      <br></br>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
      <br></br>

      <br />

      <a href='http://localhost:3000/api/auth/42/login'>42Login</a>
      <br></br>
      <a href='http://localhost:3000/api/auth/google/login'>GoogleLogin</a>
      <br></br>
      <a href='http://localhost:3000/api/auth/github/login'>GithubLogin</a>
    </div>
  );
}

export default Authentication
