import React from 'react'
import './App.css'
import { Link, Route, Switch } from 'wouter'
import Authentication from './auth/Authentication'

import { Login } from './auth/Login/LoginForm'
import { Signup } from './auth/Signup/SignupForm'
import { Home } from './home/Home'
import { NotFound } from './ErrorPages/404'
import { FindUser } from './auth/IsAuth'
import PrivateMessage from './chat/PrivateMessage'

function App() {
  return (
    <div className='App'>
      <Link href='/home'>
        <a>Home</a>
      </Link>
      <br />
      <Link href='/chat'>
        <a>Chat Discussion</a>
      </Link>
      <br />
      <Link href='/testUser'>
        <a>Test getUser</a>
      </Link>
      <p></p>
      <Link href='/'>
        <a>Auth</a>
      </Link>
      <br></br>
      <br></br>
      <Switch>
        <Route path='/' component={Authentication} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/home' component={Home} />
        <Route path='/chat' component={PrivateMessage} />
        <Route path='/testUser' component={FindUser} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
