import React, { useState } from 'react';
import './App.css';
import {Signup} from './signUpForm'
import {Login} from './loginForm'
import Cookies from 'js-cookie';

function App() {
  

  const [currentForm, setCurrentForm] = useState('login');
  
  const toggleForm = (formName : any) => {
    setCurrentForm(formName);
    console.log(formName)
  }
  const [cookies, setCookies] = useState({
    username: Cookies.get()
  })


  return (

        <div className="App">
        {
          currentForm === "Login" ? <Login onFormSwitch={toggleForm}  /> : <Signup onFormSwitch={toggleForm}  />
          
        }
        </div>
  );

}

export default App;
