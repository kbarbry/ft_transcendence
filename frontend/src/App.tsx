import React from 'react';
import './App.css';
import { Link, Route, RouteComponentProps } from 'wouter';
import Authentication from './auth/Authentication';
import {Login} from './auth/Login/LoginForm'
import {Signup} from './auth/Signup/SignupForm'

import {Home} from './home'

function App() {
  return (
    <div className="App">
      <Link href="/">
        <a>Home</a>
      </Link>
      <p></p>
      <Link href="/auth/login">
        <a>Login</a>
      </Link>
      <p></p>
      <Link href="/auth/Signup">
        <a>Signup</a>
      </Link>
      <Route path="/"  component={Home}/>
      <Route path="/auth/Login" component={Login}/>
      <Route path="/auth/Signup" component={Signup}/>
      <Route path="/auth" component={Authentication}/>

    </div>
  );
}

export default App;

  {/* <Authentication onFormSwitch={handleFormSwitch} /> */}
