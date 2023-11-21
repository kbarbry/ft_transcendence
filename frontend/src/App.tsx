import React from 'react';
import './App.css';
import { Link, Route, RouteComponentProps, Switch } from 'wouter';
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
      <Link href="/auth">
        <a>Auth</a>
      </Link>
      <br></br>
      <br></br>
      <Route path="/"  component={Home}/>
      <Route path="/auth/Login" component={Login}/>
      <Route path="/auth/Signup" component={Signup}/>
      <Route path="/auth" component={Authentication}/>
      <Switch>
      <Route path="/about">...</Route>
      <Route>404, Not Found!</Route>
      </Switch>


    </div>
  );
}

export default App;

  {/* <Authentication onFormSwitch={handleFormSwitch} /> */}
