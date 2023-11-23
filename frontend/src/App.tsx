import React from 'react'
import './App.css'
import { Link, Route, Switch } from 'wouter'
import Authentication from './auth/Authentication'

import { Login } from './auth/Login/LoginForm'
import { Signup } from './auth/Signup/SignupForm'
import { Home } from './home'
import { NotFound } from './ErrorPages/404'
import { FindUser } from './auth/IsAuth'

function App() {
  return (
    <div className='App'>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <br />
      <Link href='/testUser'>
        <a>Test getUser</a>
      </Link>
      <p></p>
      <Link href='/auth'>
        <a>Auth</a>
      </Link>
      <br></br>
      <br></br>
      <Switch>
        <Route path='/testUser' component={FindUser} />
        <Route path='/' component={Home} />
        <Route path='/auth/Login' component={Login} />
        <Route path='/auth/Signup' component={Signup} />
        <Route path='/auth' component={Authentication} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App

{
  /* <Authentication onFormSwitch={handleFormSwitch} /> */
}
