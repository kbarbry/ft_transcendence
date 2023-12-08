import React from 'react'
import './App.css'
import { Link, Route, Switch } from 'wouter'
import Authentication from './auth/Authentication'
import { NotFound } from './ErrorPages/404'
import { ForbiddenAccess } from './ErrorPages/403'
import { validation2fa } from './auth/2fa/2fLogin'
import { Signup } from './auth/Signup/SignupForm'

const App_public: React.FC = () => {
  return (
    <div className='App_public'>
      <h2>Public APP</h2>
      <br />
      <Link href='/'>
        <a>Auth</a>
      </Link>
      <br></br>
      <br></br>
      <Switch>
        <Route path='/' component={Authentication} />
        <Route path='/signup' component={Signup} />
        <Route path='/2fa/login' component={validation2fa} />
        <Route path='/home' component={ForbiddenAccess} />
        <Route path='/chat' component={ForbiddenAccess} />
        <Route path='/testUser' component={ForbiddenAccess} />
        <Route path='/forbidden' component={ForbiddenAccess} />
        <Route path='/Welcome' component={ForbiddenAccess} />
        <Route path='/Game' component={ForbiddenAccess} />

        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App_public
