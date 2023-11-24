import React from 'react'
import './App.css'
import { Link, Route, Switch } from 'wouter'
import Authentication from './auth/Authentication'

import { Login } from './auth/Login/LoginForm'
import { Signup } from './auth/Signup/SignupForm'
import { Home } from './home/Home'
import { NotFound } from './ErrorPages/404'
import PrivateMessage from './chat/PrivateMessage'

function App() {
  return (
    <div className='App'>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <br />
      <Link href='/chat'>
        <a>Chat Discussion</a>
      </Link>
      <p></p>
      <Link href='/auth'>
        <a>Auth</a>
      </Link>
      <br></br>
      <br></br>
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/auth/Login' component={Login} />
        <Route path='/auth/Signup' component={Signup} />
        <Route path='/auth' component={Authentication} />
        <Route path='/chat' component={PrivateMessage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
