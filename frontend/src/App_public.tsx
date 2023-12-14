import React from 'react'
import { Link, Route, Switch } from 'wouter'
import { NotFound } from './ErrorPages/404'
import { ForbiddenAccess } from './ErrorPages/403'
import { validation2fa } from './auth/2fa/2fLogin'
import Auth from './auth/Auth'

const App_public: React.FC = () => {
  return (
    <div className='App_public unselectable'>
      <Link href='/'></Link>
      <Switch>
        <Route path='/' component={Auth} />
        <Route path='/home' component={ForbiddenAccess} />
        <Route path='/chat' component={ForbiddenAccess} />
        <Route path='/2fa/login' component={validation2fa} />
        <Route path='/testUser' component={ForbiddenAccess} />
        <Route path='/forbidden' component={ForbiddenAccess} />
        <Route path='/Welcome' component={ForbiddenAccess} />
        <Route path='/Game' component={ForbiddenAccess} />
        <Route path='/UserPage' component={ForbiddenAccess} />

        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App_public
