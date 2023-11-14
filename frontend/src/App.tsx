import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createUser } from './createUser'
import { SignupForm } from './signUpForm'
import { FindUser } from './findUser'

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const handleCreateUserClick = () => {
    console.log('button clicked')
    createUser('Created_Username', 'votre_email2@example.com', '12345678')
      .then((userData) => {
        setUserData(userData);
      })
      .catch((error) => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
      });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        <button onClick={handleCreateUserClick}>Créer un utilisateur</button>
      </div>
        {FindUser('uMfOIJgh_KALob-TUA1kl')}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
