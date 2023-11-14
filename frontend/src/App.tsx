import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createUser } from './createUser'
import { SignupForm } from './signUpForm'
import { FindUser } from './findUser'
import {Signup} from './signUpForm'
import {LogUser} from './logUser'
import {Login} from './loginForm'

function App() {

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName : any) => {
    setCurrentForm(formName);
    console.log(formName)
  }

  return (
    <div className="App">
      {
        currentForm === "Login" ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />
      }
    </div>
  );

  return (
    <>
      {/* <div>
        <button onClick={handleCreateUserClick}>Créer un utilisateur</button>
      </div> */}

    </>
  );
}

export default App;
